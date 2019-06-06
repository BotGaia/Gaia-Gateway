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
  postAuthentication: (body) => {
    let errorMessage = '';
    const parameters = [{ parameter: 'telegramId', type: 'string' },
      { parameter: 'hoursBefore', type: 'number' }, { parameter: 'minutesBefore', type: 'number' },
      { parameter: 'hour', type: 'number' }, { parameter: 'minutes', type: 'number' },
      { parameter: 'sport', type: 'string' }, { parameter: 'days', type: 'object' },
      { parameter: 'locals', type: 'object' }];

    parameters.forEach((value) => {
      if (typeof (body[value.parameter]) !== value.type) {
        if (typeof (body[value.parameter]) === 'undefined') {
          errorMessage = `${errorMessage}BodyError: Missing non-optional property '${value.parameter}'\n`;
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

    if (body.class || body.date) {
      if (!body.class) {
        errorMessage = `${errorMessage}NotifyError: Missing Notify non-optional parameter 'class'.\n`;
      }

      if (!body.date) {
        errorMessage = `${errorMessage}NotifyError: Missing Notify non-optional parameter 'date'.\n`;
      }
    }

    if (body.class) {
      if (typeof (body.class) !== 'string') {
        errorMessage = `${errorMessage}ClassError: 'class' should be a String, but is actually a ${typeof (body.class)}.\n`;
      }
    }

    if (body.date) {
      if (typeof (body.date) !== 'string') {
        errorMessage = `${errorMessage}DateError: 'date' should be a String, but is actually a ${typeof (body.date)}.\n`;
      }
    }

    if (errorMessage === '') {
      return false;
    }

    return errorMessage;
  },
};
