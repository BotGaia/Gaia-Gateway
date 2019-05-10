const http = require('http');

module.exports = {
  getClimate: (endpoint, place) => {
    let URL = '';
    let localData = '';
    if (endpoint === 'allSports') {
      URL = `http://68.183.43.29:30000/${endpoint}`;
    } else {
      URL = `http://68.183.43.29:30000/${endpoint}?place=${place}`;
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
