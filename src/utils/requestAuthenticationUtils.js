module.exports = {
  getAuthentication: (query) => {
    let errorMessage = '';

    if (query.intent) {
      if ((query.intent !== 'sports') && (query.intent !== 'climate')) {
        errorMessage = `${errorMessage}IntentError: Expected Intent to be equal to 'sports' or 'climate', but instead got '${query.intent}'.\n`;
      }
    }

    if (errorMessage === '') {
      return false;
    }

    return errorMessage;
  },

  notificationAuthentication: (body) => {
    let errorMessage = '';
    const parameters = [{ parameter: 'telegramId', type: 'string' },
      { parameter: 'hoursBefore', type: 'number' }, { parameter: 'minutesBefore', type: 'number' },
      { parameter: 'hour', type: 'number' }, { parameter: 'minutes', type: 'number' },
      { parameter: 'sport', type: 'string' }, { parameter: 'days', type: 'object' },
      { parameter: 'locals', type: 'object' }];

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

    if (typeof (body.days) === 'object') {
      body.days.forEach((day) => {
        if ((typeof (day) !== 'number') && (typeof (day) !== 'string')) {
          errorMessage = `${errorMessage}DaysError: 'days' should contain Numbers or Strings, but instead contains ${typeof (day)}.\n`;
        }
      });
    }

    if (typeof (body.locals) === 'object') {
      body.locals.forEach((local) => {
        if (typeof (local) !== 'string') {
          errorMessage = `${errorMessage}LocalsError: 'locals' should contain Strings, but instead contains ${typeof (local)}.\n`;
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

    if (errorMessage === '') {
      return false;
    }

    return errorMessage;
  },
};
