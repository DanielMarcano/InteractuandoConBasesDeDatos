var User = require('./userModel').User;
var EventModel = require('./userModel').EventModel;
var Router = require('express').Router();
var assert = require('assert');
var passwordHash = require('password-hash');
var moment = require('moment');

Router.put('/events/new', function(req, res) {

})

.get('/events/delete/:id', function(req, res) {

})

.post('/login', function(req, res) {
  User.findOne({username: req.body.user}, function(err, user) {
    assert.equal(err, null);
    if (passwordHash.verify(req.body.pass, user.password)) {
      req.session.username = req.body.user;
      res.end('OK');
    } else {
      req.session.destroy(function(err) {});
      res.end('The user has not been found...');
    }
  });
})

.get('/login', function(req, res) {
  var response = '';
  if (req.session.username) {
    response = {
      message: 'OK',
      username: req.session.username
    };
    res.json(response);
  } else {
    response = {
      message: 'You must login first'
    };
    res.json(response);
  }
})

.get('/events', function(req, res) {
  var response = '';
  if (req.session.username) {
    User.findOne({username: req.session.username}, function(err, user) {
      var id = user._id;
      EventModel.find({userId: id}, function(err, events) {
        if (err) {
          response = {
            message: 'The events were not fetch...'
          };
          res.json(response);
        } else {
          response = {
            message: 'OK',
            events: prepareEvents(events)
          };
          res.json(response);
        }

        // res.json(events);
      });
    });

  }
});

function prepareEvents(events) {
  var preparedEvents = [];
  events.forEach(function(event, index) {
    preparedEvent = {};
    preparedEvent.title = event.title;
    preparedEvent.fullDay = event.fullDay;
    if (event.fullDay) {
      preparedEvent.start = event.startDate;
    } else {
      startDateTime = new moment(event.startDate + ' ' + event.startHour).format("YYYY-MM-DD HH:mm:ss");
      endDateTime = new moment(event.endDate + ' ' + event.endHour).format("YYYY-MM-DD HH:mm:ss");
      preparedEvent.start = startDateTime;
      preparedEvent.end = endDateTime;
    }
    preparedEvents.push(preparedEvent);
  });
  return preparedEvents;
}

exports.Router = Router;
