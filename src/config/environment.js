module.exports = {
  configSport: () => {
    if (process.env.ENVIRONMENT === 'dev') {
      global.URL_SPORT = `http://${process.env.IP_ADDRESS}:3000`;
    } else if (process.env.ENVIRONMENT === 'homolog') {
      global.URL_SPORT = 'https://esporte.hml.botgaia.ga';
    } else {
      global.URL_SPORT = 'https://esporte.botgaia.ga';
    }
  },

  configCyclone: () => {
    if (process.env.ENVIRONMENT === 'dev') {
      global.URL_CYCLONE = `http://${process.env.IP_ADDRESS}:3001`;
    } else if (process.env.ENVIRONMENT === 'homolog') {
      global.URL_CYCLONE = 'https://ciclone.hml.botgaia.ga';
    } else {
      global.URL_CYCLONE = 'https://ciclone.botgaia.ga';
    }
  },
};
