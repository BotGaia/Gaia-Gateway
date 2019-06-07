module.exports = {
  getJson: () => {
    const endpoints = [
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
          {
            name: 'class',
            type: 'string',
          },
          {
            name: 'date',
            type: 'string',
          },
        ],
        description: 'Sends a message according to the received notification',
      },
      {
        type: 'GET',
        endpoint: '/esporte',
        parameters: [
          {
            name: 'local',
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
          {
            name: 'id',
            type: 'string',
          },
          {
            name: 'number',
            type: 'number',
          },
        ],
        description: 'Redirects GET requests according to parameters given',
      },
      {
        type: 'POST',
        endpoint: '/esporte',
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
        description: 'Redirects POST requests to Gaia-Esporte createNotification route',
      },
    ];
    return endpoints;
  },
};
