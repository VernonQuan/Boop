var express = require('express');
var bodyParser = require('body-parser');
var ambitHelper = require('./ambitData/ambitHelper.js');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var ambitRouter = require('./routers/router.js');
require('./config/middleware.js')(app, express);

var Ambit = require('./ambitData/ambitSchema');
var User = require('./users/userModel');

var userCtrl = require('./controllers/userController');

require('./config/passport');

app.use('/ambits', ambitRouter);

app.post('/register', userCtrl.register);
app.post('/login', userCtrl.login);

// To use on Heroku, set the environment variable:
// $ heroku set:config MONGOLAB_URL=mongodb://user:password@mongolabstuff
var db = (process.env.MONGOLAB_URL || 'mongodb://localhost/ambits');
mongoose.connect(db);

// To use on Heroku, must use port provided by process.env:
var port = (process.env.PORT || 3000);
app.listen(port);
console.log('Server is now listening at port ' + port);
