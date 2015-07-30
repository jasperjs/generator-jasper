var express = require('express'),
    app = express(),
    port = process.env.PORT || <%= port =>;

var http = require('http');
var fs = require('fs');

var server = http.createServer(app);

// jdebug-server
require('jdebug-server')(app, server);
// static files handler
app.use(express.static(__dirname));
// jdebug-server
app.jDebugServer();
// for any other requests
app.get('*', function (req, res, next) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(port);
console.log('Server listening on port: ' + port);
