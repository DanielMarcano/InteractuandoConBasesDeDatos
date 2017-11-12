var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection('mongodb://localhost/NodeJSCalendar');

autoIncrement.initialize(connection);
var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// UserSchema.plugin(autoIncrement.plugin, 'User');
UserSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    startAt: 0
});
var User = connection.model('User', UserSchema);

exports.User = User;

var EventSchema = new Schema({
  userId: {
    type: Number,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  startHour: String,
  endDate: String,
  endHour: String,
  fullDay: {
    type: Boolean,
    required: true
  }
});

// EventSchema.plugin(autoIncrement.plugin, 'Event');
EventSchema.plugin(autoIncrement.plugin, {
  model: 'Event',
  startAt: 0
});
var EventModel = connection.model('Event', EventSchema);

exports.EventModel = EventModel;
