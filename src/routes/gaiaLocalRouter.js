const http = require('http');

module.exports = {
  getLocal: (endpoint, address) => {
    let URL = '';
    let localData = '';

    if (process.env.ENVIRONMENT === 'dev') {
      URL = `http://${process.env.IP_ADDRESS}:3001/${endpoint}?address=${address}`;
    } else if (process.env.ENVIRONMENT === 'homolog') {
      URL = `http://68.183.43.29:30000/${endpoint}?address=${address}`;
    }

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
