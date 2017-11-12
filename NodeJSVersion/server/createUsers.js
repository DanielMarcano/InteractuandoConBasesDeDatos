var express = require('express');
var app = express();
var mongoose = require('mongoose');
var User = require('./userModel').User;
var EventModel = require('./userModel').EventModel;
var passwordHash = require('password-hash');
var assert = require('assert');

var connection = mongoose.createConnection('mongodb://localhost/NodeJSCalendar');

var hashedPassword = passwordHash.generate('soyelmejor');

var newUser = new User({
  username: 'danielmarcanodev@gmail.com',
  password: hashedPassword
});

var newEvent = new EventModel({
  userId: 0,
  title: 'To test it all',
  startDate: "11/12/2017",
  endDate: "11/15/2017",
  startHour: "16:00:00",
  endHour: "20:00:00",
  fullDay: false
});

newUser.save(function(err) {
  assert.equal(err, null);
  console.log('The user was successfully saved!');
  connection.close();
});

newEvent.save(function(err) {
  assert.equal(err, null);
  console.log('The event was successfully saved!');
  connection.close();
});
