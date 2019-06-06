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

    if (!body.telegramId) {
      errorMessage = `${errorMessage}BodyError: Missing non-optional property 'telegramId'\n`;
    }

    if (!body.days) {
      errorMessage = `${errorMessage}BodyError: Missing non-optional property 'days'\n`;
    }

    if (!body.hoursBefore) {
      errorMessage = `${errorMessage}BodyError: Missing non-optional property 'hoursBefore'\n`;
    }

    if (!body.minutesBefore) {
      errorMessage = `${errorMessage}BodyError: Missing non-optional parameter 'minutesBefore'\n`;
    }

    if (!body.hour) {
      errorMessage = `${errorMessage}BodyError: Missing non-optional parameter 'hour'\n`;
    }

    if (!body.minutes) {
      errorMessage = `${errorMessage}BodyError: Missing non-optional parameter 'minutes'\n`;
    }

    if (!body.sport) {
      errorMessage = `${errorMessage}BodyError: Missing non-optional parameter 'sport'\n`;
    }

    if (!body.locals) {
      errorMessage = `${errorMessage}BodyError: Missing non-optional parameter 'locals'\n`;
    }

    if (typeof(body.days) !== 'object') {
      errorMessage = `${errorMessage}DaysError: 'days' should be an Array, but is actually a ${typeof(body.days)}.\n`;
    }

    if (typeof(body.locals) !== 'object') {
      errorMessage = `${errorMessage}LocalsError: 'locals' should be an Array, but is actually a ${typeof(body.locals)}.\n`;
    }

    if (body.days) {
      body.days.forEach((day) => {
        if((typeof(day) !== 'number') && (typeof(day) !== 'string')) {
          errorMessage = `${errorMessage}DaysError: 'days' should contain Numbers or Strings, but instead contains ${typeof(day)}.\n`;
        }
      });
    }

    if (body.locals) {
      body.locals.forEach((local) => {
        if(typeof(local) !== 'string') {
          errorMessage = `${errorMessage}LocalsError: 'locals' should contain Strings, but instead contains ${typeof(local)}.\n`;
        }
      });
    }

    if (body.class || body.date) {
      if(!body.class) {
        errorMessage = `${errorMessage}NotifyError: Missing Notify non-optional parameter 'class'.\n`;
      }

      if(!body.date) {
        errorMessage = `${errorMessage}NotifyError: Missing Notify non-optional parameter 'date'.\n`;
      }
    }

    if (body.class) {
      if (typeof(body.class) !== 'string') {
        errorMessage = `${errorMessage}ClassError: 'class' should be a String, but is actually a ${typeof(body.class)}.\n`;
      }
    }

    if (body.date) {
      if (typeof(body.date) !== 'string') {
        errorMessage = `${errorMessage}DateError: 'date' should be a String, but is actually a ${typeof(body.date)}.\n`;
      }
    }

    if (errorMessage === '') {
      return false;
    }

    return errorMessage;
  }
};
