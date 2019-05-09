const express = require('express');
const local = require('./gaiaLocalRouter');
const climate = require('./gaiaClimaRouter');

const router = express.Router();

router.get('/local/:endpoint', (req, res) => {
  local.getLocal(req.params.endpoint, req.query.address).then((localJson) => {
    res.json(localJson);
  });
});

router.get('/climate', (req, res) => {
});

router.post('/notification', (req, res) => {

});

module.exports = app => app.use('/', router);
