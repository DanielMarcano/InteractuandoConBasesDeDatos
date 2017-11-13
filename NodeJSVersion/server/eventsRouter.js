var User = require('./userModel').User;
var EventModel = require('./userModel').EventModel;
var Router = require('express').Router();
var assert = require('assert');
var passwordHash = require('password-hash');
var moment = require('moment');

Router.post('/events/new', function(req, res) {
  console.log(req.body);
  console.log(req.session.username);
  User.findOne({username: req.session.username}, function(err, user) {
    assert.equal(err, null);
    var id = user._id;
    var newEvent;
    console.log(user);

    if (req.body.fullDay) {
      newEvent = new EventModel({
        userId: id,
        title: req.body.title,
        startDate: req.body.startDate,
        fullDay: req.body.fullDay
      });
      newEvent.save(function(err) {
        var response = {};
        if (err) {
          console.log(err);
          response = {
            message: 'There was an error trying to add the new event...'
          };
        } else {
          response = {
            message: 'OK'
          };
        }
        res.json(response);
      });
    } else {
      newEvent = new EventModel({
        userId: id,
        title: req.body.title,
        startDate: req.body.startDate,
        startHour: req.body.startHour,
        endDate: req.body.endDate,
        endHour: req.body.endHour,
        fullDay: req.body.fullDay
      });
      newEvent.save(function(err) {
        var response = {};
        if (err) {
          console.log(err);
          response = {
            message: 'There was an error trying to add the new event...'
          };
        } else {
          response = {
            message: 'OK'
          };
        }
        res.json(response);
      });
    }
  });
})

.delete('/event/:id', function(req, res) {
  User.findOne({username: req.session.username}, function(err, user) {
    assert.equal(err, null);
    var id = user._id;
    EventModel.findOneAndRemove({userId: id, _id: req.params.id}, function(err, myEvent) {
      assert.equal(err, null);
      response = {
        message: 'OK'
      };
      res.json(response);
    });

  });
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

.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    res.json({
      message: 'You have logged out successfully'
    });
  });
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
    preparedEvent.id = event._id;
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
