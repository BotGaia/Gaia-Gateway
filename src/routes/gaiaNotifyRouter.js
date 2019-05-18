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

module.exports = {
  sendNotification: (notification) => new Promise((resolve) => {
    const messageOne = 'This is a';
    const messageTwo = 'notification';

    sendMessage(messageOne, notification).then((response) => {
      if(response.code === 400) {
        resolve({ok: "false"});
      }

      sendMessage(messageTwo, notification).then((response2) => {
        if(response2.code === 400) {
          resolve({ok: "false"});
        }

        resolve({ok: "true"});
      });
    });
  }),
};
