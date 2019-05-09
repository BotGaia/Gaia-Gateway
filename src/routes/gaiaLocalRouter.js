const http = require('http');

module.exports = {
  getLocal: (endpoint, address) => {
    const URL = `http://68.183.43.29:31170/${endpoint}?address=${address}`;

    let localData = '';

    return new Promise((resolve) => {
      http.get(URL, (resp) => {
        resp.on('data', (chungus) => {
          localData += chungus;
        });

        resp.on('end', () => {
          resolve(JSON.parse(localData));
        });
      });
    });
  },
};