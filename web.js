#!/usr/bin/env node


var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

//****************JADE***********************//

//include jade
app.set('views', __dirname + "/tpl");
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);



//******************GET BOARDS LOCAL**********************//

//var list = require(__dirname + '/resources/boardlist.json');


//******************GET BOARDS TUMBLR**********************//

//get them from tumblr
var tumblr = require('tumblr');
var blog = new tumblr.Blog('skatemoss.com', {consumer_key: '0S8LLINIwPsMy8dFgsAyUInDAxUrKn52YXy0ez4930hwfhO3LF'});

var boardList = { 
	"items": new Array(),
};

var posts = blog.posts(function(err, res){
	var posts = res.posts;
	for (var i = 0; i < posts.length; i++)
	{
		var post = posts[i];
		if(post.type == 'photo')
		{
			var thumb = post.photos[0].alt_sizes[3].url;
			var big = post.photos[0].alt_sizes[0].url;
			var item = {
				"id": 'board-'+i,
				"thumb": thumb,
				"img": big,
			}
			boardList.items.push(item);
		}
	}
});


//******************SERVER CONTROLLER COMMUNICATION**********************//

//set menu callbacks (what to do with each url)
app.get("/", function(req, res){
	res.render("home");
});

app.get("/beamer", function(req, res){
	res.render("beamer", boardList);
});

app.get("/controller", function(req, res){
	res.render("controller", boardList);
});

app.get("/stats", function(req, res){
	res.render("stats");
});


app.use(express.static(__dirname + '/public'));
var io = require('socket.io').listen(app.listen(port));

//necessary for heroku / https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku
io.configure(function () {
	io.set("transports", ["xhr-polling"]);
	io.set("polling duration", 10);
});


console.log("Listening on port "+port);
var stats = {
	date: Date(),
	data: new Array(),
};

io.sockets.on('connection', function(socket){
	socket.on('send', function(data){
		//compute stats
		if(stats.data[data.id])
		{
			stats.data[data.id].count++;
		}
		else
		{
			stats.data[data.id] = {
				count: 1,
			};
		}
		io.sockets.emit('send', data);
	})
})