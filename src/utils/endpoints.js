module.exports = {
  getJson: () => {
    const endpoints = [
      {
        type: 'GET',
        endpoint: '/',
        parameters: [
          {
            name: 'address',
            type: 'string',
          },
          {
            name: 'place',
            type: 'string',
          },
          {
            name: 'intent',
            type: 'string',
          },
        ],
        description: 'Redirects GET requests according to parameters given',
      },
      {
        type: 'POST',
        endpoint: '/',
        parameters: [
          {
            name: 'telegramId',
            type: 'string',
          },
          {
            name: 'sport',
            type: 'string',
          },
          {
            name: 'days',
            type: 'array<string>',
          },
          {
            name: 'hour',
            type: 'integer',
          },
          {
            name: 'locals',
            type: 'array<string>',
          },
          {
            name: 'minutes',
            type: 'integer',
          },
          {
            name: 'hoursBefore',
            type: 'integer',
          },
          {
            name: 'minutesBefore',
            type: 'integer',
          },
        ],
        description: 'Redirects POST requests to Gaia-Esporte createNotification or Gaia-Gateway Notify route',
      },
    ];
    return endpoints;
  },
};
