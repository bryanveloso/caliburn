var http = require('http');
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

// Configure express.
app.use(express.static(__dirname + '/'));

// Instantiate a server.
var server = http.createServer(app).listen(port);
console.log('http server listening on %d', port);

// Instantiate socket.io.
var io = require('socket.io')(server);
console.log('socket.io server created');

io.on('connection', function(socket) {
  console.log('socket.io connection open');

  // Events.
  // Subscription sending/receiving.
  socket.on('subscription sent', function(data, fn) {
    io.emit('subscription received', data);
  });

  // Cleanup.
  socket.on('close', function() {
    console.log('socket.io connection closed');
  });
});
