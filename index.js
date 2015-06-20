var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/app')); // todo rename to public

http.createServer(app).listen(3000);