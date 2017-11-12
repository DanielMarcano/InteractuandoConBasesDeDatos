var User = require('./userModel').User;
var Router = require('express').Router();
var assert = require('assert');
var passwordHash = require('password-hash');

Router.put('/events/new', function(req, res) {

})

.get('/events/delete/:id', function(req, res) {

})

.post('/login', function(req, res) {
  User.findOne({email: req.body.user}, function(err, user) {
    assert.equal(err, null);
    if (passwordHash.verify(req.body.pass, user.password)) {
      req.session.user = req.body.user;
      res.end('OK');
    } else {
      req.session.destroy(function(err) {});
      res.end('The user has not been found...');
    }
  });
})

.get('/login', function(req, res) {
  var response = '';
  if (req.session.user) {
    response = {
      message: 'OK',
      username: req.session.user
    };
    res.json(response);
  } else {
    response = {
      message: 'You must login first'
    };
    res.json(response);
  }
});

exports.Router = Router;
