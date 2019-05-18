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

function sportRecommendation(conditions, notification, index) {
  switch (conditions.sportResult) {
    case 'favorable':
      return `As condições metereológicas previstas para ${notification.day}/
        ${notification.month} em ${notification.locals[index]} estão favoráveis
        para a prática de ${notification.sport}.`;
      break;
    case 'reservation':
      return `Algumas condições metereológicas previstas para ${notification.day}/
        ${notification.month} em ${notification.locals[index]} estão favoráveis
        para a prática de ${notification.sport}.`;
      break;
    case 'alert':
      return `Poucas condições metereológicas previstas para ${notification.day}/
        ${notification.month} em ${notification.locals[index]} estão favoráveis
        para a prática de ${notification.sport}.`;
      break;
    case 'not':
      return `Para ${notification.day}/${notification.month} em ${notification.locals[index]}
        não é recomendada prática de ${notification.sport}.`;
      break;
    default:
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
  sendNotification: (notification) => new Promise((resolve) => {
    const messages = [];

    if (process.env.ENVIRONMENT === 'dev') {
      URL = `http://${process.env.IP_ADDRESS}:3000/sportForecast`;
    } else if (process.env.ENVIRONMENT === 'homolog') {
      URL = 'https://clima.hml.botgaia.ga/sportForecast';
    }

    axios.post(URL, notification).then((response) => {
      response.data.forEach((conditions, index) => {
        sendMessage(sportRecommendation(conditions, notification, index), notification);

        setClimateMessages(messages, conditions);

        messages.forEach((message) => {
          sendMessage(message, notification);
        });
      });
    });
  }),
};
