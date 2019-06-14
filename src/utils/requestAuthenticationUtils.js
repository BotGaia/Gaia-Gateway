module.exports = {
  getAuthentication: (query) => {
    let errorMessage = '';

    if (query.intent) {
      if ((query.intent !== 'sports') && (query.intent !== 'climate') && (query.intent !== 'delete') && (query.intent !== 'show')) {
        errorMessage = `${errorMessage}IntentError: Expected Intent to be equal to 'sports' or 'climate' or 'delete' or 'show', but instead got '${query.intent}'.\n`;
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
      { parameter: 'sport', type: 'string' }];

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

    if (typeof (body.days) !== 'object' && typeof (body.days) !== 'string') {
      if (typeof (body.days) === 'undefined') {
        errorMessage = `${errorMessage}BodyError: Missing property 'days'\n`;
      } else {
        errorMessage = `${errorMessage}BodyError: 'days' should be Object or String, but is actually a ${typeof (body.days)}.\n`;
      }
    }

    if (typeof (body.locals) !== 'object' && typeof (body.locals) !== 'string') {
      if (typeof (body.locals) === 'undefined') {
        errorMessage = `${errorMessage}BodyError: Missing property 'locals'\n`;
      } else {
        errorMessage = `${errorMessage}BodyError: 'locals' should be Object or String, but is actually a ${typeof (body.locals)}.\n`;
      }
    }

    if (typeof (body.days) === 'object') {
      body.days.forEach((day) => {
        if ((typeof (day) !== 'string')) {
          errorMessage = `${errorMessage}DaysError: 'days' should contain Strings, but instead contains ${typeof (day)}.\n`;
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
