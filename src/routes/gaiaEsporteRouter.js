const axios = require('axios');
const notification = require('../utils/notificationTreatmentUtils');

require('../config/environment');

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

  postNotification: json => new Promise((resolve) => {
    const URL = `${global.URL_SPORT}/createNotification`;
    const dataJson = json;
    const daysArray = [];

    if (typeof dataJson.days !== 'object') {
      daysArray.push(dataJson.days);
      dataJson.days = daysArray;
    }

    if ((json.days[0][0] === 'T' && json.days[0][1] === 'o') || (json.days[0][0] === 't' && json.days[0][1] === 'o')) {
      dataJson.days = [0, 1, 2, 3, 4, 5, 6];
    } else {
      dataJson.days = notification.convertDay(dataJson.days);
    }
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

  deleteNotification: (id, number) => {
    const URL = `${global.URL_SPORT}/deleteNotification`;
    const params = {
      id,
      number,
    };

    return new Promise((resolve) => {
      axios.get(URL, { params })
        .then((response) => {
          resolve(response.data);
        }).catch((err) => {
          resolve(err.code);
        });
    });
  },

  getNotification: (id) => {
    const URL = `${global.URL_SPORT}/userNotification`;
    const params = {
      id,
    };

    return new Promise((resolve) => {
      axios.get(URL, { params })
        .then((response) => {
          resolve(response.data);
        }).catch((err) => {
          resolve(err.code);
        });
    });
  },

  getClimateForecast: (place, hours) => {
    const URL = `${global.URL_SPORT}/climateForecast`;
    const today = new Date();
    const tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
    let day = tomorrow.getDate().toString();
    let month = (tomorrow.getMonth() + 1).toString();
    const year = tomorrow.getFullYear().toString();
    let hour = hours;

    if (day.length < 2) {
      day = `0${day}`;
    }
    if (month.length < 2) {
      month = `0${month}`;
    }
    if (hour.length < 2) {
      hour = `0${hour}`;
    }
    const date = `${year}-${month}-${day}T${hour}:00:00.000Z`;

    const params = {
      place,
      date,
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

  getAllSports: (intent) => {
    const URL = `${global.URL_SPORT}/${intent}`;

    return new Promise((resolve) => {
      axios.get(URL)
        .then((response) => {
          resolve(response.data);
        }).catch((err) => {
          resolve(err.response.data);
        });
    });
  },
};
