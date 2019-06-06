const axios = require('axios');

module.exports = {
  getLocal: (local) => {
    const URL = `${global.URL_SPORT}/listLocales`;
    const params = {
      local,
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
