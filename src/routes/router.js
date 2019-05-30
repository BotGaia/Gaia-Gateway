const express = require('express');
const local = require('./gaiaLocalRouter');
const climate = require('./gaiaClimaRouter');
const notification = require('./gaiaNotificaRouter');
const notify = require('./gaiaNotifyRouter');
const endpoints = require('../utils/endpoints');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(endpoints.getJson());
});

router.get('/local/:endpoint', (req, res) => {
  local.getLocal(req.params.endpoint, req.query.address).then((localJson) => {
    res.json(localJson);
  });
});

router.get('/climate/:endpoint', (req, res) => {
  climate.getClimate(req.params.endpoint, req.query.place).then((climateJson) => {
    res.json(climateJson);
  });
});

router.post('/notification/:endpoint', (req, res) => {
  notification.postNotification(req.params.endpoint, req.body).then((response) => {
    res.json(response);
  });
});

router.post('/notifyUser', (req, res) => {
  notify.sendNotification(req.body).then((response) => {
    res.json(response);
  });
});

module.exports = app => app.use('/', router);
