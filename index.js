var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
//var router = express.Router();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
// all data requests with /api
app.use("/api", require('./routes/routes.js'));
// serve static files
app.use(express.static(__dirname + '/app'));


http.createServer(app).listen(3000);