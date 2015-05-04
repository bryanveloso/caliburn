var http = require('http');
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

// Logging.
var winston = require('winston');
winston.level = 'debug';

// Configure express.
app.use(express.static(__dirname + '/'));

// Instantiate a server.
var server = http.createServer(app).listen(port);
winston.info('HTTP server listening on port %d.', port);

// Instantiate socket.io.
var io = require('socket.io')(server);
winston.info('Socket.io server created.');

io.on('connection', function(socket) {
  winston.info('Socket.io connection opened.', {id: socket.id});

  // Events.
  // Subscription event sending/receiving.
  socket.on('event sent', function(data) {
    winston.debug('Event "' + data.event + '" received.', {data: data});
    socket.broadcast.emit('event received', data);
    socket.emit('event received', data);
  });

  // Cleanup.
  socket.on('close', function() {
    winston.info('Socket.io connection closed.', {id: socket.id});
  });
});

// Configure keep-alive.
app.get('/', function(req, res) {
  res.status(200).type('json');
  res.json({greeting: "Hello. I am a socket."}).end();
});

// Keep the app alive.
var schedule = require('node-schedule');
var request = require('request');
var job = schedule.scheduleJob('0 */5 * * * *', function() {
  request.get('https://caliburn.herokuapp.com/');
});
