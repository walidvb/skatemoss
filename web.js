#!/usr/bin/env node


var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
//include jade
app.set('views', __dirname + "/tpl");
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

//get boards
//var list = require(__dirname + '/resources/boardlist.json');
//get them from tumblr
var tumblr = require('tumblr');
var blog = new tumblr.Blog('skatemoss.com', {consumer_key: '0S8LLINIwPsMy8dFgsAyUInDAxUrKn52YXy0ez4930hwfhO3LF'});

var boardList = { 
	"items": new Array(),
	"server": "localhost.local:3000",
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
//set menu callbacks
app.get("/", function(req, res){
	res.render("home");
});

app.get("/stats", function(req, res){
	res.render("stats");
});

app.get("/beamer", function(req, res){
	boardList.server = req.headers.host;
	boardList.title = "beamer";
    res.end(req.headers.host);
	res.render("beamer", boardList);
});

app.get("/controller", function(req, res){
	boardList.server = req.headers.host;
    res.end(req.headers.host);
	boardList.title = "controller";
	res.render("controller", boardList);
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