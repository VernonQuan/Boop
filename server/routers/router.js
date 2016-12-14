var express = require('express');
var userCtrl = require('../controllers/userController');
var ambitHelper = require('../ambitData/ambitHelper.js');
var app = express();
var ambitRouter = require('express').Router();

ambitRouter.get('/', ambitHelper.getAmbits);
ambitRouter.post('/', ambitHelper.addAmbit);
ambitRouter.delete('/', ambitHelper.deleteAllAmbits);

ambitRouter.post('/:id', ambitHelper.saveCheckIn);

module.exports = ambitRouter;