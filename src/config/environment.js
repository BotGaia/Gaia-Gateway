module.exports = {
  configClimate: () => {
    if (process.env.ENVIRONMENT === 'dev') {
      global.URL_CLIMATE = `https://${process.env.IP_ADDRESS}:3000`;
    } else if (process.env.ENVIRONMENT === 'homolog') {
      global.URL_CLIMATE = 'https://clima.hml.botgaia.ga';
    } else {
      global.URL_CLIMATE = 'https://clima.botgaia.ga';
    }
  },

  configLocal: () => {
    if (process.env.ENVIRONMENT === 'dev') {
      global.URL_LOCAL = `https://${process.env.IP_ADDRESS}:3001`;
    } else if (process.env.ENVIRONMENT === 'homolog') {
      global.URL_LOCAL = 'https://local.hml.botgaia.ga';
    } else {
      global.URL_LOCAL = 'https://local.botgaia.ga';
    }
  },

  configNotify: () => {
    if (process.env.ENVIRONMENT === 'dev') {
      global.URL_NOTIFY = `https://${process.env.IP_ADDRESS}:3003`;
    } else if (process.env.ENVIRONMENT === 'homolog') {
      global.URL_NOTIFY = 'https://notifica.hml.botgaia.ga';
    } else {
      global.URL_NOTIFY = 'https://notifica.botgaia.ga';
    }
  },
};
