const axios = require('axios');
const notification = require('../utils/notificationTreatmentUtils');

require('../config/environment');

module.exports = {
  postNotification: json => new Promise((resolve) => {
    const URL = `${global.URL_SPORT}/createNotification`;
    const dataJson = json;
    const daysArray = [];
    const localsArray = [];

    if (typeof dataJson.days !== 'object') {
      daysArray.push(dataJson.days);
      dataJson.days = daysArray;
    }

    if (typeof dataJson.locals !== 'object') {
      localsArray.push(dataJson.locals);
      dataJson.locals = localsArray;
    }

    dataJson.days = notification.convertDay(dataJson.days);
    dataJson.hoursBefore = notification.convertTimeBefore(dataJson.hoursBefore);
    dataJson.minutesBefore = notification.convertTimeBefore(dataJson.minutesBefore);
    dataJson.hour = parseInt(dataJson.hour, 10);
    dataJson.minutes = parseInt(dataJson.minutes, 10);

    axios.post(URL, dataJson).then((res) => {
      resolve(res.data);
    }).catch(() => {
      resolve(JSON.parse('{"cod": 400}'));
    });
  }),
  deleteNotification: (telegramId, userChoice) => {
    const URL = `${global.URL_SPORT}/deleteNotification`;
    const params = {
      id: telegramId,
      number: userChoice,
    };

    return new Promise((resolve) => {
      axios.get(URL, { params })
        .then((response) => {
          resolve(response.data);
        }).catch((err) => {
          resolve(err.response.data);
        });
    });
  },
  getNotification: (telegramId) => {
    const URL = `${global.URL_SPORT}/userNotification`;
    const params = {
      id: telegramId,
    };

    return new Promise((resolve) => {
      axios.get(URL, { params })
        .then((response) => {
          resolve(response.data);
        }).catch((err) => {
          resolve(err.response.data);
        });
    });
  },
};
