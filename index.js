var express = require('express'),
app = express(),
spawn = require('child_process').spawn,
py = spawn('python', ['helloworld.py']),
request = require('request')
http = require('http');

var server = app.listen(3000, function() {
  console.log("Running at port 3k");
});

var io = require('socket.io').listen(server);

app.use('/', express.static(__dirname + '/client/'));
/*
http://www.program-o.com/chatbotapi
6 	Program O 	The original chatbot
10 	ShakespeareBot 	Talk to William Shakespeare!
12 	Chatmundo 	Talk to the twitterbot!
15 	Elizaibeth 	Talk to me!
*/

io.on('connection', function(socket) {
  console.log("connection created");
  socket.on('new_message', function(data) {
  var options = {};
  options.bot_id = 6;
  options.say = "Hello";
  options.convo_id = 133;
  options.format = 'json';
  urlstring = 'http://api.program-o.com/v2/chatbot/?bot_id=6&say=' + data.message + '&convo_id=helloworld_1231232&format=json';
    request({url: urlstring}, function(err, response, body) {
      console.log(err);
      console.log(response);
      console.log(body);
      io.emit('reply', {
        message: 'Bot reply',
        data: JSON.parse(body).botsay,
        user: data.user
      });
    })
  });

});
