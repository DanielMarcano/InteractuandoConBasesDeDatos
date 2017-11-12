var express = require('express');
var app = express();
var mongoose = require('mongoose');
var User = require('./userModel').User;
var EventModule = require('./userModel').EventModule;
var passwordHash = require('password-hash');
var assert = require('assert');

var connection = mongoose.createConnection('mongodb://localhost/NodeJSCalendar');

var hashedPassword = passwordHash.generate('soyelmejor');

var newUser = new User({
  email: 'danielmarcanodev@gmail.com',
  password: hashedPassword
});

var newEvent = new EventModule({
  userId: 1,
  title: 'To cook a mockingbird',
  startDate: new Date(),
  fullDay: true
});

newUser.save(function(err) {
  assert.equal(err, null);
  console.log('The user was successfully saved!');
  connection.close();
});
