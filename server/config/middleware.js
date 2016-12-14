var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var ambitHelper = require('../ambitData/ambitHelper.js');
var ambitRouter = require('../routers/router.js');
var path = require('path');
var app = express();

var Ambit = require('../ambitData/ambitSchema');
var User = require('../users/userModel');

var userCtrl = require('../controllers/userController');

module.exports = function(app, express) {
  app.use(morgan('dev'));

  if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const config = require('../../webpack-dev-server.config.js');
    const compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      stats: { colors: true }
    }));
  }

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const staticPath =  (process.env.NODE_ENV === 'production') ?
    path.resolve(__dirname, '../../client/dist') :
    path.resolve(__dirname, '../../client/src/www');


  app.use(express.static(staticPath));
  app.set('views', staticPath);

  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');


  //prevents a "cannot GET" error on page reload by redirecting to main page
  // app.get('*', function (req, res) {
  //     res.redirect('/');
  // });
}