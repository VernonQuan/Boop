var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var User = require('../users/userModel');

var boopSchema = new Schema({
  refId: {type: Number, index: true}, //a number used to keep track of the boop
  name: String,
  coords: {
    latitude: Number,
    longitude: Number
  },
  weekdays: [Boolean], //0 is Sunday, 6 is Saturday
  startDate: Date,
  limit: Number,
  joinedUsers: [String],
  endDate: [Date],
  ownerId:  {type: Schema.Types.ObjectId, ref: 'User'},
  checkIns: [Date] // a history of successful check-ins
  //time (when during the day are you supposed to check in)
  //repeats (every week? every other week? is this necessary?)
});

var Boop = mongoose.model('Boop', boopSchema);

module.exports = Boop;
