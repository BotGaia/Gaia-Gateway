module.exports = {
  convertDay: (dayArray) => {
    const answerArray = [];

    dayArray.forEach((day) => {
      switch (day.toLowerCase()) {
        case 'segunda':
        case 'segunda-feira':
          answerArray.push(1);
          break;
        case 'terça':
        case 'terça-feira':
          answerArray.push(2);
          break;
        case 'quarta':
        case 'quarta-feira':
          answerArray.push(3);
          break;
        case 'quinta':
        case 'quinta-feira':
          answerArray.push(4);
          break;
        case 'sexta':
        case 'sexta-feira':
          answerArray.push(5);
          break;
        case 'sábado':
        case 'sabado':
          answerArray.push(6);
          break;
        case 'domingo':
          answerArray.push(0);
          break;
        default:
          break;
      }
    });

    return answerArray;
  },

  convertTimeBefore: (timeBefore) => {
    let convertedTime = '';
    let char;

    for (char = 0; char < timeBefore.length; char += 1) {
      const currentChar = timeBefore[char];

      if ((currentChar === '0') || (currentChar === '1') || (currentChar === '2')
        || (currentChar === '3') || (currentChar === '4') || (currentChar === '5')
        || (currentChar === '6') || (currentChar === '7') || (currentChar === '8')
        || (currentChar === '9')) {
        convertedTime = `${convertedTime}${currentChar}`;
      }
    }

    return parseInt(convertedTime, 10);
  },
};
