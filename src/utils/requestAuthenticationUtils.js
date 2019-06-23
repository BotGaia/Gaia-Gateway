module.exports = {
  getAuthentication: (query) => {
    let errorMessage = '';

    if (query.intent) {
      if ((query.intent !== 'sports') && (query.intent !== 'climate') && (query.intent !== 'delete') && (query.intent !== 'show') && (query.intent !== 'forecast') && (query.intent !== 'allSports')) {
        errorMessage = `${errorMessage}IntentError: Expected Intent to be equal to 'sports' or 'climate' or 'delete' or 'show' or 'forecast' or 'allSports, but instead got '${query.intent}'.\n`;
      }
    }

    if (errorMessage === '') {
      return false;
    }

    return errorMessage;
  },

  notificationAuthentication: (body) => {
    let errorMessage = '';
    const parameters = ['telegramId',
      'hoursBefore', 'minutesBefore',
      'hour', 'minutes', 'sport', 'locals'];

    parameters.forEach((value) => {
      const bodyType = typeof (body[value]);

      if (bodyType !== 'string') {
        if (typeof (body[value]) === 'undefined') {
          errorMessage = `${errorMessage}BodyError: Missing property '${value}'\n`;
        } else {
          errorMessage = `${errorMessage}BodyError: '${value}' should be String, but is actually a ${typeof (body[value])}.\n`;
        }
      }
    });

    if (typeof (body.days) !== 'object' && typeof (body.days) !== 'string') {
      if (typeof (body.days) === 'undefined') {
        errorMessage = `${errorMessage}BodyError: Missing property 'days'\n`;
      } else {
        errorMessage = `${errorMessage}BodyError: 'days' should be Object or String, but is actually a ${typeof (body.days)}.\n`;
      }
    }

    if (typeof (body.days) === 'object') {
      body.days.forEach((day) => {
        if ((typeof (day) !== 'string')) {
          errorMessage = `${errorMessage}DaysError: 'days' should contain Strings, but instead contains ${typeof (day)}.\n`;
        }
      });
    }

    if (errorMessage === '') {
      return false;
    }

    return errorMessage;
  },

  notifyAuthentication: (body) => {
    let errorMessage = '';

    if (body.cyclones || body.users) {
      const parameters = [{ parameter: 'cyclones', type: 'object' },
        { parameter: 'users', type: 'object' }];

      parameters.forEach((value) => {
        const bodyType = typeof (body[value.parameter]);

        if (bodyType !== value.type) {
          if (typeof (body[value.parameter]) === 'undefined') {
            errorMessage = `${errorMessage}CycloneNotificationError: Missing property '${value.parameter}'\n`;
          } else {
            errorMessage = `${errorMessage}CycloneNotificationError: '${value.parameter}' should be ${value.type}, but is actually a ${typeof (body[value.parameter])}.\n`;
          }
        }
      });
    } else {
      const parameters = [{ parameter: 'class', type: 'string' },
        { parameter: 'date', type: 'string' }];

      parameters.forEach((value) => {
        const bodyType = typeof (body[value.parameter]);

        if (bodyType !== value.type) {
          if (typeof (body[value.parameter]) === 'undefined') {
            errorMessage = `${errorMessage}BodyError: Missing property '${value.parameter}'\n`;
          } else {
            errorMessage = `${errorMessage}BodyError: '${value.parameter}' should be ${value.type}, but is actually a ${typeof (body[value.parameter])}.\n`;
          }
        }
      });
    }

    if (errorMessage === '') {
      return false;
    }

    return errorMessage;
  },

  cycloneAuthentication: (body) => {
    let errorMessage = '';
    const params = { telegramId: 'telegramId', type: 'string' };

    const bodyType = typeof (body.telegramId);

    if (bodyType !== params.type) {
      if (typeof (params.id) === 'undefined') {
        errorMessage = `${errorMessage}BodyError: Missing property '${params.telegramId}'\n`;
      } else {
        errorMessage = `${errorMessage}BodyError: '${params.telegramId}' should be ${params.type}, but is actually a ${typeof (bodyType)}.\n`;
      }
    }

    if (errorMessage === '') {
      return false;
    }

    return errorMessage;
  },
};
