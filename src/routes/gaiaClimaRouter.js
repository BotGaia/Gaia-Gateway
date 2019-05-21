const http = require('http');

module.exports = {
  getClimate: (endpoint, place) => {
    let URL = '';
    let localData = '';

    if (place) {
      URL = `${global.URL_CLIMATE}/${endpoint}?place=${place}`;
    } else {
      URL = `${global.URL_CLIMATE}/${endpoint}`;
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
