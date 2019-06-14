const express = require('express');
const esporte = require('./gaiaEsporteRouter');
const ciclone = require('./gaiaCicloneRouter');
const notify = require('./gaiaNotifyRouter');
const endpoints = require('../utils/endpoints');
const authentication = require('../utils/requestAuthenticationUtils');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(endpoints.getJson());
});

router.get('/esporte', (req, res) => {
  const authenticationResponse = authentication.getAuthentication(req.query);

  if (!authenticationResponse) {
    if (req.query.local) {
      esporte.getLocal(req.query.local).then((localJson) => {
        res.json(localJson);
      });
    } else if (req.query.place && req.query.intent === 'climate') {
      esporte.getClimate(req.query.intent, req.query.place).then((climateJson) => {
        res.json(climateJson);
      });
    } else if (req.query.place && req.query.intent === 'sports') {
      esporte.getClimate(req.query.intent, req.query.place).then((climateJson) => {
        res.json(climateJson);
      });
    } else if (req.query.id) {
      if (req.query.number) {
        esporte.deleteNotification(req.query.id, req.query.number)
          .then((notificationResponse) => {
            res.json(notificationResponse);
          });
      } else {
        esporte.getNotification(req.query.id).then((notifications) => {
          res.json(notifications);
        });
      }
    } else {
      res.json(endpoints.getJson());
    }
  } else {
    res.end(authenticationResponse);
  }
});

router.get('/ciclone', (req, res) => {
  const authenticationResponse = authentication.getAuthentication(req.query);

  if (!authenticationResponse) {
    if (req.query.id && req.query.intent === 'delete') {
      ciclone.deleteCycloneAlert(req.query.id).then((cycloneAlert) => {
        res.json(cycloneAlert);
      });
    } else if (req.query.id && req.query.intent === 'show') {
      ciclone.getCycloneAlert(req.query.id).then((cycloneAlert) => {
        res.json(cycloneAlert);
      });
    }
  }
});

router.post('/esporte', (req, res) => {
  const authenticationResponse = authentication.notificationAuthentication(req.body);
  if (!authenticationResponse) {
    esporte.postNotification(req.body).then((response) => {
      res.json(response);
    });
  } else {
    res.end(authenticationResponse);
  }
});

router.post('/ciclone', (req, res) => {
  const authenticationResponse = authentication.cycloneAuthentication(req.body);

  if (!authenticationResponse) {
    ciclone.postCycloneAlert(req.body).then((cycloneAlert) => {
      res.json(cycloneAlert);
    });
  } else {
    res.end(authenticationResponse);
  }
});

router.post('/', (req, res) => {
  const notifyAuthenticationResponse = authentication.notifyAuthentication(req.body);
  const notificationAuthenticationResponse = authentication.notificationAuthentication(req.body);

  if (!(notifyAuthenticationResponse || notificationAuthenticationResponse)) {
    notify.sendNotification(req.body).then((response) => {
      res.json(response);
    });
  } else {
    res.end(`${notificationAuthenticationResponse}${notifyAuthenticationResponse}`);
  }
});

module.exports = app => app.use('/', router);
