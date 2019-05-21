const http = require('http');

module.exports = {
  getLocal: (endpoint, address) => {
    const URL = `${global.URL_LOCAL}/${endpoint}?address=${address}`;
    let localData = '';

    return new Promise((resolve) => {
      http.get(URL, (resp) => {
        resp.on('data', (chungus) => {
          localData += chungus;
        });

        resp.on('end', () => {
          try {
            resolve(JSON.parse(localData));
          } catch (error) {
            resolve(JSON.parse('{"cod": 400}'));
          }
        });
      }).on('error', () => {
        resolve(JSON.parse('{"cod": 400}'));
      });
    });
  },
};
