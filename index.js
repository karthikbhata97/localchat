var express = require('express'),
app = express(),
spawn = require('child_process').spawn,
py = spawn('python', ['helloworld.py']),
request = require('request')
http = require('http'),
users = [];

var server = app.listen(3000, function() {
  console.log("Running at port 3k");
});

var io = require('socket.io').listen(server);

app.use('/', express.static(__dirname + '/client/'));

app.get('/api/getuserlist', function(req, res) {
  res.send(users);
});

io.on('connection', function(socket) {
  console.log("connection created");
  socket.on('new_message', function(data) {
      io.emit('reply', {
        message: data.user,
        data: data.message,
        user: data.user
      });
  });

  socket.on('add_user', function(data) {
    users.push(data.username);
    io.emit('new_user', {
      username: data.username,
      message: "New user logged in: " + data.username
    })
  });

  socket.on('logout_user', function(data) {
    users.splice(users.indexOf(data.username), 1);
    io.emit("logout", {
      username: data.username
    })
  })
});
