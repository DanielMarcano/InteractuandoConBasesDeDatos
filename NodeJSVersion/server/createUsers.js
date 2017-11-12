var express = require('express');
var app = express();
var mongoose = require('mongoose');
var User = require('./userModel').User;
var passwordHash = require('password-hash');
var assert = require('assert');

mongoose.connect('mongodb://localhost/NodeJSCalendar');

// var hashedPassword = passwordHash.generate('soyelmejor');

// var newUser = new User({
//   email: 'danielmarcanodev@gmail.com',
//   password: hashedPassword
// });
//
// newUser.save(function(err) {
//   assert.equal(err, null);
//   console.log('The user was successfully saved!');
// });

User.findOne({email: 'danielmarcanodev@gmail.com'}, function(err, res) {
  assert.equal(err, null);
  console.log(res.password);
  console.log(passwordHash.verify('soyelmejor', res.password));
  console.log(passwordHash.verify('soyelmejorcito', res.password));
});

passwordHash.verify('soyelmejor', 'hashedPassword'); // returns a boolean
