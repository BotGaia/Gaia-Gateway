const express = require('express');
const local = require('./gaiaLocalRouter');
const climate = require('./gaiaClimaRouter');
const notification = require('./gaiaNotificaRouter');
const notify = require('./gaiaNotifyRouter');
const endpoints = require('../utils/endpoints');
const authentication = require('../utils/requestAuthenticationUtils');

const router = express.Router();

router.get('/', (req, res) => {
  const authenticationResponse = authentication.getAuthentication(req.query);

  if (!authenticationResponse) {
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
  } else {
    res.end(authenticationResponse);
  }
});

router.post('/', (req, res) => {
  const authenticationResponse = authentication.postAuthentication(req.body);

  if (!authenticationResponse) {
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
  } else {
    res.end(authenticationResponse);
  }
});

module.exports = app => app.use('/', router);
