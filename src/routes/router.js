const express = require('express');
const local = require('./gaiaLocalRouter');
const climate = require('./gaiaClimaRouter');
const notification = require('./gaiaNotificaRouter');
const notify = require('./gaiaNotifyRouter');
const endpoints = require('../utils/endpoints');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query.address) {
	  local.getLocal('listLocales', req.query.address).then((localJson) => {
		  res.json(localJson);
	  });
  } else if (req.query.place && req.query.intent === 'climate') {
	  climate.getClimate('climate', req.query.place).then((climateJson) => {
		  res.json(climateJson);
	  });
  } else if (req.query.place && req.query.intent === 'sport') {
	  climate.getClimate('sports', req.query.place).then((climateJson) => {
		  res.json(climateJson);
	  });
  } else {
	  res.json(endpoints.getJson());
  }
});

router.post('/', (req, res) => {
  notification.postNotification('createNotification', req.body).then((response) => {
    res.json(response);
  });
});

module.exports = app => app.use('/', router);
