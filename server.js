//	Customization

var appPort = 11000;

// Librairies

var express = require('express'), app = express();
var http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

var eventInfo = require('./data/got-data').eventInfo;
// Views Options

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set("view options", { layout: false })

app.configure(function() {
	app.use(express.static(__dirname + '/public'));
});

// Render and send the main page

app.get('/', function(req, res){
  res.render('player.ejs');
});
app.get('/player', function(req, res){
  res.render('player.ejs');
});
app.get('/client', function(req, res){
  res.render('client.ejs');
});
app.get('/test', function(req, res){
  res.render('test.ejs');
});

server.listen(appPort);
console.log("Server listening on port 11000");

// Handle the socket.io connections

io.sockets.on('connection', function (socket) { // First connection

	socket.on('videoStart', function (data) { // Broadcast the message to all
		io.sockets.emit('videoStart', {message: data.message});
	});
	socket.on('eventBroadcast', function (data) { // Broadcast the message to all
		io.sockets.emit('incomingEvent', {eventInfo: eventInfo[data.eventIndex]});
	});
	socket.on('changeScene', function (data) { // Broadcast the message to all
		io.sockets.emit('changeSceneOnPlayer', {index: data.index});
	});
});