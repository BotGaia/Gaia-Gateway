/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const axios = require('axios');

function sendMessage(message, notification) {
  return new Promise((resolve) => {
    const params = {
      chat_id: notification.telegramId,
      text: message,
    };

    axios.get(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, { params })
      .then((res) => {
        resolve(res.data);
      }).catch(() => {
        resolve(JSON.parse('{"cod": 400}'));
      });
  });
}

function recommendSport(conditions, notification, index) {
  switch (conditions.sportResult) {
    case 'favorable':
      return `As condições metereológicas previstas para ${notification.day}/
        ${notification.month} em ${notification.locals[index]} estão favoráveis
        para a prática de ${notification.sport}.`;
    case 'reservation':
      return `Algumas condições metereológicas previstas para ${notification.day}/
        ${notification.month} em ${notification.locals[index]} estão favoráveis
        para a prática de ${notification.sport}.`;
    case 'alert':
      return `Poucas condições metereológicas previstas para ${notification.day}/
        ${notification.month} em ${notification.locals[index]} estão favoráveis
        para a prática de ${notification.sport}.`;
    case 'not':
      return `Para ${notification.day}/${notification.month} em ${notification.locals[index]}
        não é recomendada prática de ${notification.sport}.`;
    default:
      return 'error';
  }
}

function setClimateMessages(messages, conditions) {
  messages.push(`Para essa data, neste local, minha temperatura é ${conditions.weather.temperature} °C,`);
  messages.push(`com umidade de ${conditions.weather.humidity}%`);
  messages.push(`e pressão ${conditions.weather.pressure} atm.`);
  messages.push(`Meus ventos sopram para ${conditions.weather.windyDegrees},`);
  messages.push(`com velocidade de ${conditions.weather.windySpeed} m/s`);
  messages.push(`e apresento ${conditions.weather.sky}.`);
}

module.exports = {
  sendNotification: notification => new Promise((resolve) => {
    let messages = [];
    const postURL = `${global.URL_CLIMATE}/sportForecast`;

    axios.post(postURL, notification).then(async (res) => {
      for (const index in res.data) {
        if (res.data) {
          await sendMessage(recommendSport(res.data[index], notification, index), notification);
          await setClimateMessages(messages, res.data[index]);
          for (const messageIndex in messages) {
            if (messages) {
              await sendMessage(messages[messageIndex], notification);
            }
          }
          messages = [];
        }
      }
      resolve(res.data);
    });
  }),
};
