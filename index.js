var http = require('http');
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

// Logging.
var winston = require('winston');

// Configure express.
app.use(express.static(__dirname + '/'));

// Instantiate a server.
var server = http.createServer(app).listen(port);
winston.debug('HTTP server listening on %d.', port);

// Instantiate socket.io.
var io = require('socket.io')(server);
winston.debug('Socket.io server created.');

io.on('connection', function(socket) {
  winston.log('Socket.io connection opened.');

  // Events.
  // Subscription event sending/receiving.
  socket.on('subscription sent', function(data) {
    io.emit('subscription received', data);
  });

  // Resubscription event sending/receiving.
  socket.on('resubscription sent', function(data) {
    io.emit('resubscription received', data);
  });

  // Substreak event sending/receiving.
  socket.on('substreak sent', function(data) {
    io.emit('substreak received', data);
  });

  // Donation event sending/receiving.
  socket.on('donation sent', function(data) {
    io.emit('donation received', data);
  });

  // Cleanup.
  socket.on('close', function() {
    console.log('socket.io connection closed');
  });
});
