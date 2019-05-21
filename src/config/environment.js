
module.exports = {
  configClimate: () => {
    if (process.env.ENVIRONMENT === 'dev') {
      global.URL_CLIMATE = `http://${process.env.IP_ADDRESS}:3002`;
    } else if (process.env.ENVIRONMENT === 'homolog') {
      global.URL_CLIMATE = 'http://clima.hml.botgaia.ga';
    } else {
      global.URL_CLIMATE = 'https://clima.botgaia.ga';
    }
  },
};
