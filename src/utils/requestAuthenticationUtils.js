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
};
