const http = require('http');

module.exports = {
  getClimate: (endpoint, place) => {
    let URL = '';
    let localData = '';

    if (process.env.ENVIRONMENT === 'dev') {
      URL = `http://${process.env.IP_ADDRESS}:3000/`;
    } else if (process.env.ENVIRONMENT === 'homolog') {
      URL = 'http://68.183.43.29:30000/';
    }

    if (place) {
      URL = `${URL}${endpoint}?place=${place}`;
    } else {
      URL = `${URL}${endpoint}`;
    }

    return new Promise((resolve) => {
      http.get(URL, (resp) => {
        resp.on('data', (chungus) => {
          localData += chungus;
        });

        resp.on('end', () => {
          try {
            resolve(JSON.parse(localData));
          } catch (err) {
            resolve(JSON.parse('{"cod": 400}'));
          }
        });
      }).on('error', () => {
        resolve(JSON.parse('{"cod": 400}'));
      });
    });
  },
};
