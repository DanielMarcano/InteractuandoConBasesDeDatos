var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection('mongodb://localhost/NodeJSCalendar');

autoIncrement.initialize(connection);
var UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.plugin(autoIncrement.plugin, 'User');
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
    type: Date,
    required: true
  },
  startHour: Date,
  endDate: Date,
  endHour: Date,
  fullDay: {
    type: Boolean,
    required: true
  }
});

EventSchema.plugin(autoIncrement.plugin, 'Event');
var EventModel = connection.model('Event', EventSchema);

exports.EventModel = EventModel;
