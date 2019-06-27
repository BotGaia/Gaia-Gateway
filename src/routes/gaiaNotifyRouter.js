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
      }).catch((err) => {
        resolve({ ok: false, error: err });
      });
  });
}

function recommendSport(conditions, notification) {
  let partOne;
  let partTwo;
  let partThree;

  switch (conditions.sportResult) {
    case 'favorable':
      partOne = `As condições metereológicas previstas para ${notification.date.getDate()}/`;
      partTwo = `${notification.date.getMonth() + 1} em ${notification.local} estão favoráveis`;
      partThree = ` para a prática de ${notification.sport}.\n\n`;
      return `${partOne}${partTwo}${partThree}`;
    case 'reservation':
      partOne = `Algumas condições metereológicas previstas para ${notification.date.getDate()}/`;
      partTwo = `${notification.date.getMonth() + 1} em ${notification.local} estão favoráveis`;
      partThree = ` para a prática de ${notification.sport}.\n\n`;
      return `${partOne}${partTwo}${partThree}`;
    case 'alert':
      partOne = `Poucas condições metereológicas previstas para ${notification.date.getDate()}/`;
      partTwo = `${notification.date.getMonth() + 1} em ${notification.local} estão favoráveis`;
      partThree = ` para a prática de ${notification.sport}.\n\n`;
      return `${partOne}${partTwo}${partThree}`;
    case 'not':
      partOne = `Para ${notification.date.getDate()}/${notification.date.getMonth() + 1} em ${notification.local}`;
      partTwo = ` não é recomendada prática de ${notification.sport}.\n\n`;
      return `${partOne}${partTwo}`;
    default:
      return 'error';
  }
}

function setClimateMessages(messages, conditions) {
  messages.push(`Para essa data, neste local, minha temperatura é ${conditions.weather.temperature} °C,`);
  messages.push(` com umidade de ${conditions.weather.humidity}%`);
  messages.push(` e pressão ${conditions.weather.pressure} atm.`);
  messages.push(` Meus ventos sopram para ${conditions.weather.windyDegrees},`);
  messages.push(` com velocidade de ${conditions.weather.windySpeed} m/s`);
  messages.push(` e apresento ${conditions.weather.sky}.`);
}

function setCycloneMessage(target) {
  const cyclone = target;
  const cycloneAttributes = ['name', 'originBasin', 'currentBasin', 'startDate',
    'endDate', 'stormType', 'windSpeed'];

  cycloneAttributes.forEach((attribute) => {
    if (!cyclone[attribute]) {
      cyclone[attribute] = 'Indeterminado';
    }
  });

  const beginDate = new Date(cyclone.startDate).toLocaleString('pt-BR');

  return `Nome: ${cyclone.name}\nBacia de Origem: ${cyclone.originBasin}
Bacia Atual: ${cyclone.currentBasin}\nData de início: ${beginDate}
Data de fim: ${cyclone.endDate}\nTipo de tempestade: ${cyclone.stormType}
Velocidade dos ventos: ${cyclone.windSpeed.toFixed(2)} m/s\n\n`;
}

module.exports = {
  sendNotification: notification => new Promise((resolve) => {
    const usefulNotification = notification;
    usefulNotification.date = new Date(notification.date);
    if (notification.users && notification.cyclones) {
      try {
        notification.users.forEach(async (user) => {
          if (notification.cyclones[0]) {
            await sendMessage('Notificações de Ciclones:', user);
          }

          notification.cyclones.forEach((cyclone) => {
            sendMessage(setCycloneMessage(cyclone), user);
          });
        });
        resolve({ ok: true });
      } catch (err) {
        resolve({ ok: false, error: err });
      }
    } else {
      let messages = [];
      let answer;
      const postURL = `${global.URL_SPORT}/sportForecast`;

      axios.post(postURL, usefulNotification).then(async (res) => {
        try {
          if (res.data) {
            let climateMessage = recommendSport(res.data, usefulNotification);

            await setClimateMessages(messages, res.data);
            for (const messageIndex in messages) {
              if (messages) {
                climateMessage = `${climateMessage}${messages[messageIndex]}`;
              }
            }
            answer = await sendMessage(climateMessage, usefulNotification);
            if (answer.ok === false) {
              throw (answer);
            }
            messages = [];
          }
          resolve({ ok: true });
        } catch (err) {
          resolve({ ok: false, error: err });
        }
      }).catch((err) => {
        resolve({ ok: false, error: err });
      });
    }
  }),
};
