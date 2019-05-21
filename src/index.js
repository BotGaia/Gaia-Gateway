/* eslint-disable import/no-unresolved */
const express = require('express');
const bodyParser = require('body-parser');
const environment = require('./config/environment');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

environment.configClimate();
environment.configLocal();
environment.configNotify();

require('./routes/router')(app);

app.listen(3002);

module.exports = app;
