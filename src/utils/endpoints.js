module.exports = {
  getJson: () => {
    const endpoints = [
      {
        type: 'GET',
        endpoint: '/climate',
        parameters: [
          {
            name: 'climate',
            type: 'string',
          },
          {
            name: 'sports',
            type: 'string',
          },
          {
            name: 'allSports',
            type: 'string',
          },
          {
            name: 'place',
            type: 'string',
          },
        ],
        description: 'Redirects climate requests to the climate microservice',
      },
      {
        type: 'GET',
        endpoint: '/local',
        parameters: [
          {
            name: 'local',
            type: 'string',
          },
          {
            name: 'listLocales',
            type: 'string',
          },
          {
            name: 'address',
            type: 'string',
          },
        ],
        description: 'Redirects locale requests to the locale microservice',
      },
      {
        type: 'POST',
        endpoint: '/notification',
        parameters: [
          {
            name: 'userRegister',
            type: 'string',
          },
          {
            name: 'telegramId',
            type: 'string',
          },
          {
            name: 'sport',
            type: 'string',
          },
          {
            name: 'notificationDays',
            type: 'string',
          },
          {
            name: 'notificationTime',
            type: 'string',
          },
          {
            name: 'local',
            type: 'string',
          },
        ],
        description: 'Redirects locale notification to the notification microservice',
      },
    ];
    return endpoints;
  },
};
