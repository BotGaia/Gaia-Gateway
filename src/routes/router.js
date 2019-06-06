const express = require('express');
const local = require('./gaiaLocalRouter');
const climate = require('./gaiaClimaRouter');
const notification = require('./gaiaNotificaRouter');
const notify = require('./gaiaNotifyRouter');
const endpoints = require('../utils/endpoints');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query.address) {
    local.getLocal(req.query.address).then((localJson) => {
      res.json(localJson);
    });
  } else if (req.query.place && req.query.intent === 'climate') {
    climate.getClimate(req.query.intent, req.query.place).then((climateJson) => {
      res.json(climateJson);
    });
  } else if (req.query.place && req.query.intent === 'sports') {
    climate.getClimate(req.query.intent, req.query.place).then((climateJson) => {
      res.json(climateJson);
    });
  } else {
    res.json(endpoints.getJson());
  }
});

router.post('/', (req, res) => {
  if (req.body.date) {
    notify.sendNotification(req.body).then((response) => {
      res.json(response);
    });
  } else if (req.body.hoursBefore) {
    notification.postNotification(req.body).then((response) => {
      res.json(response);
    });
  } else {
    res.json(endpoints.getJson());
  }
});

module.exports = app => app.use('/', router);
