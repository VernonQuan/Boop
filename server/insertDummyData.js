const dummyData = require('./users/userDummyData.js');
var mongoose = require('mongoose');
const User = require('./users/userModel.js');

// $ heroku set:config MONGOLAB_URL=mongodb://user:password@mongolabstuff
var db = (process.env.MONGOLAB_URL || 'mongodb://localhost/boops');
mongoose.connect(db);

dummyData.forEach(function(user) {
  User.create(user, function(err, user) {
    if (err) {
      console.log('Error inserting users,');
    } else {
      console.log(user.username, 'has been added to the database');
    }
  });
});

setTimeout(() => {console.log('Insertion operation complete. Please shut process down with Ctrl + C')}, 200);