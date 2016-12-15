import axios from 'axios';


//private helper functions:
var validateLocation = function (current, checkin) {
  const MIN_DIST = 200; // acceptable distance between boop loc and checkin loc

  var rad = function(x) {
    return x * Math.PI / 180;
  };
  //calculate the distance btw two points.
  var getDistance = function(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.latitude - p1.latitude);
    var dLong = rad(p2.longitude - p1.longitude);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.latitude)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return Math.round(d); // returns the distance in meter
  };

  if (getDistance(current, checkin) < MIN_DIST) {
    return true;
  } else {
    return false;
  }
};

//calculate boop frequency and process for display
const daysOftheWeek = function(boolArr) {
  var days = {
    0:'Su',
    1:'M',
    2:'Tu',
    3:'W',
    4:'Thu',
    5:'Fri',
    6:'Sa'
  };
  var result ='';
  boolArr.map((dayBool, i) => {
    dayBool ? result += days[i] + ' ' : null;
  });
  return result;
};

//Decorate boops for client side
const decorateBoops = function(boops) {
  boops.forEach(boop => {
    if(boop.weekdays.every(day => day === true)) {
      boop.frequency = 'Daily';
    } else {
      boop.frequency = 'Weekly - '+ daysOftheWeek(boop.weekdays);
    }
    //TODO: clean the server side check.
    //check if the user is already checked in for the day:
    //TODO: make the date time specific.
    var now = (new Date()).toDateString();
    var recentCheckin = boop.checkIns[boop.checkIns.length - 1];
    if(recentCheckin && recentCheckin.toDateString() === now) {
      boop.checkedIn = true;
    } else {
      boop.checkedIn = false;
    }
  });
  return boops;
};

const url = '';

//public functions:
export const postCheckin = function (boopId, callback) {
  axios({
    method:'post',
    url:'/boops/' + boopId,
    contentType: 'application/json'
    }).then(function(response){
      callback();
    }).catch(function(err){
      throw err;
    });
};

export const postBoop = function (boop, callback){
  axios({
    method:'post',
    url:'/boops',
    contentType: 'application/json',
    data: boop,
    }).then(function(response){
      callback(response, null);
    }).catch(function(error) {
      callback(null, error);
    });
};

export const getAllBoops = function(callback) {
  axios({
    method: 'get',
    url: url + '/boops',
    contentType: 'application/json',
  }).then(function(response) {
    //testing comment out 
    response.data.push( {
        refId: 1234,
        name: 'Gym',
        coords: {
          latitude: 37.784,
          longitude: -122.40903
        },
        weekdays:[true,true,true,true,true,true,true],
        startDate:'2016-12-12',
        checkIns:[]
        });
    response.data.push( {
        refId: 1234,
        name: 'Work at WeWork',
        coords: {
          latitude: 37.784,
          longitude: -122.40903
        },
        weekdays:[true,true,true,true,true,true,true],
        startDate:'2016-12-12',
        checkIns:[]
        });
    callback(decorateBoops(response.data));
  }).catch(function(error){
    throw error;
  });
};


export const checkinBoop = function(boop, successCb,errorCb) {
  //get current location
  if (navigator.geolocation) {
  /* geolocation is available */
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position.coords);
    var coordinates = position.coords;
    if(validateLocation(boop.coords, coordinates)) {
      console.log('valid');
      successCb();
    } else {
      //inform user that it is not a valid checkin attempt
      //cheating
      errorCb();
    }
  }, function(err) {
    throw err;
  }, {timeout: 10000});
 } else {
  //device does not support geolocation:
  console.log('your device does not support geolocation :(');
 }
};
