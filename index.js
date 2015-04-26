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
    console.log 'subscription received!';
  });

  // Resubscription event sending/receiving.
  socket.on('resubscription sent', function(data) {
    io.emit('resubscription received', data);
    console.log 'resubscription received!';
  });

  // Substreak event sending/receiving.
  socket.on('substreak sent', function(data) {
    io.emit('substreak received', data);
    console.log 'substreak received!';
  });

  // Donation event sending/receiving.
  socket.on('donation sent', function(data) {
    io.emit('donation received', data);
    console.log 'donation received!';
  });

  // Host event sending/receiving.
  socket.on('host sent', function(data) {
    io.emit('host received', data);
    console.log 'host received!';
  });

  // Cleanup.
  socket.on('close', function() {
    console.log('socket.io connection closed');
  });
});
