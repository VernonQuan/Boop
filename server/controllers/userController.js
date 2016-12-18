var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../users/userModel.js');
var jwt = require('jwt-simple');
var Q = require('q');

var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);
var findAllUsers = Q.nbind(User.find, User);

module.exports = {
  register: function (req, res, next) {
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body);
    if (!email || !username || !password) {
      res.status(400).json({
        message: "All fields required."
      });
    } else {
      findUser({ email: email })
        .then(function (user) {
          if (user) {
            res.status(400).json({
              message: 'User already exists.'
            });
            return null;
          } else {
            return createUser(req.body);
          }
        })
        .then(function (user) {
          if (user) {
            var token = jwt.encode(user, process.env.JWT_SECRET || 'ancient dev secret');
            res.json({"token": token, userData: user});
          }
        })
        .fail(function (error) {
          next(error);
        });
    }

  },
  login: function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    // console.log(req.body);
    if (!email || !password) {
      res.status(400).json({
        message: 'All fields required.'
      });
    } else {
      passport.authenticate('local', function (err, user, info) {
        var token;
        if (err) {
          res.status(400).json({
            message: "Incorrect username or password"
          });
        }
        if (user) {
          token = jwt.encode(user, process.env.JWT_SECRET || 'ancient dev secret');
          res.json({token: token, userData: user});
        } else {
          res.status(400).json({
            message: "Incorrect username or password."
          });
        }
      })(req, res);
    }
  },

  allUsers: function (req, res, next) {
    User.find({}, function(err, users) {
      if (err) {
        res.status(400).json({message: 'Unable to retrieve users'});
      } else {
        res.json(users);
      }
    })
  },
  loggedIn: function(req, res, next) {
    var refEmail = req.params.email;
    refEmail = refEmail.substring(1);
    console.log(refEmail, 'this is refEmail');
    User.find({'email':refEmail}, function(err, user) {
      if (err) {
        res.status(400).json({message: 'Unable to retrieve user'});
      } else {
        res.send(user);
      }
    })
  },
  changeRank: function(req, res, next) {
  var email = req.body.email;
  User.findOneAndUpdate({"email":email},{ $inc : { "rank" : 1 } }, {new: true})
      .then(function(data) {

      res.send(data);
      })
      .catch(function(error) {
        next(error);
      })
  }
};