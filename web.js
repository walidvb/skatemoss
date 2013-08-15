#!/usr/bin/env node


var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

//include jade
app.set('views', __dirname + "/tpl");
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

app.get("/beamer", function(req, res){
  res.render("beamer");
})

app.get("/controller", function(req, res){
  res.render("controller");
})



app.use(express.static(__dirname + '/public'));
var io = require('socket.io').listen(app.listen(port));
//necessary for heroku / https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku
io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

console.log("Listening on port "+port);

io.sockets.on('connection', function(socket){
  socket.emit('message', { message: 'welcome to the chat'});
  socket.on('send', function(data){
    io.sockets.emit('message', data);
  })
})