var express = require('express');
var bodyParser = require('body-parser');
var boopHelper = require('./boopData/boopHelper.js');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var passport = require('passport');
var boopRouter = require('./routers/router.js');
require('./config/middleware.js')(app, express);

var Boop = require('./boopData/boopSchema');
var User = require('./users/userModel');

var userCtrl = require('./controllers/userController');


require('./config/passport');

app.use('/boops', boopRouter);

app.use('/s3', require('react-dropzone-s3-uploader/s3router')({
    bucket: 'boops',
    region: 'us-west-2', //optional 
    headers: {'Access-Control-Allow-Origin': '*'}, // optional 
    ACL: 'private' // this is default 
}));

app.post('/register', userCtrl.register);
app.post('/login', userCtrl.login);
app.put('/newRank', userCtrl.changeRank);
app.get('/api/users', userCtrl.allUsers);
app.get('/user:email',userCtrl.loggedIn);

// To use on Heroku, set the environment variable:
// $ heroku set:config MONGOLAB_URL=mongodb://user:password@mongolabstuff
var db = (process.env.MONGOLAB_URL || 'mongodb://localhost/boops');
mongoose.connect(db);

io.on('connection', function(socket){
  socket.on('join', function(boop, user) {
    io.emit('join', boop, user);
  });
});

// To use on Heroku, must use port provided by process.env:
var port = (process.env.PORT || 3000);
http.listen(port);
console.log('Server is now listening at port ' + port);
