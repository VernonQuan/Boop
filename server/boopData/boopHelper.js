var Boop = require('./boopSchema.js');
var q = require('q');

var findBoop = q.nbind(Boop.findOne, Boop);
var findAllBoops = q.nbind(Boop.find, Boop);
var createBoop = q.nbind(Boop.create, Boop);

module.exports.addBoop = function (req, res, next) {
  //records a new boop from the user
  var boop = req.body;
  boop.checkIns = [];
  boop.refId = Math.round(Math.random()*10000);

  findBoop({refId: boop.refId}) //should check per user as well
    .then(function(found){
      if (found) {
        return next(new Error('Boop refId already exists'));
      }else{
        return createBoop(boop);
      }
    })
    .then(function (createdBoop) {
      if (createdBoop) { res.json(createdBoop);
      }
    })
    .fail(function (error) {
      next(error);
    });
};

module.exports.saveCheckIn = function(req, res, next) {
  //add the current date to the boops checkIn property
  //TODO: check for a preexisting check-in for this date first
  var refId = req.params.id;

  findBoop({refId: refId})
    .then(function(boop) {
      var now = new Date;
      var today = now.toDateString();
      var lastCheck = boop.checkIns[boop.checkIns.length -1].toDateString();
      if (today !== lastCheck){
        boop.checkIns.push( now );
        return boop.save();
      } else {
        res.json('already checked in');
      }
    })
    .then(function(savedBoop) { res.send(savedBoop);
    });
};

module.exports.getBoops = function(req, res, next) {
  //send an array containing all the boops back to the user.
  findAllBoops()
    .then(function(boops){ res.send(boops);})
    .fail(function (error) {
      next(error);
  });
};

module.exports.deleteAllBoops = function(req, res, next) {
  // delete all boops
  Boop.remove()
    .then(function(data) { res.send(data); })
    .catch(function(error) {
      next(error);
  });
};

module.exports.updateJoinedUsers = function(req, res, next) {
  var refId = req.params.id;
  Boop.findOneAndUpdate({refId: refId}, req.body, {new: true})
      .then(function(data) { res.send(data); })
      .catch(function(error) {
        next(error);
      });
}

