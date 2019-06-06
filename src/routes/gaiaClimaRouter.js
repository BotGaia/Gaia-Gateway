const axios = require('axios');

module.exports = {
  getClimate: (intent, place) => {
    const URL = `${global.URL_SPORT}/${intent}`;
    const params = {
      place,
    };

    return new Promise((resolve) => {
      axios.get(URL, { params })
        .then((response) => {
          resolve(response.data);
        }).catch(() => {
          resolve(JSON.parse('{"cod": 400}'));
        });
    });
  },
};
