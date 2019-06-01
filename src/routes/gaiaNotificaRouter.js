const axios = require('axios');
const notification = require('../utils/notificationTreatmentUtils');

require('../config/environment');

module.exports = {
  postNotification: (endpoint, json) => new Promise((resolve) => {
    const URL = `${global.URL_SPORT}/${endpoint}`;
    const dataJson = json;
    const daysArray = [];

    daysArray.push(dataJson);
    dataJson.days = daysArray;
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
};
