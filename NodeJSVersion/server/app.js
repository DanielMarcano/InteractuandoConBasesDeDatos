var express = require('express');
var app = express();
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var eventsRouter = require('./eventsRouter').Router;
var session = require('express-session');

mongoose.createConnection('mongodb://localhost/NodeJSCalendar');

app.use(session({
  secret: 'my secret',
  cookie: {
    maxAge: 60000
  }
}))
.use(bodyParser.json())
.use(bodyParser.urlencoded({extended: true}))
.use(express.static('client'))
.use('/', eventsRouter);

app.listen('8080', function() {
  console.log('hehehe connected');
  console.log('Server is running on PORT 8080');
});
