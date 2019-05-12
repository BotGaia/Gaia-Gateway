/* eslint-disable import/no-unresolved */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes/router')(app);

app.get('/', (req, res) => {
  res.json({ Hello: 'World' });
});

app.listen(3002);

module.exports = app;
