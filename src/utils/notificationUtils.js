module.exports = {
  convertDay: (dayArray) => {
    const answerArray = [];

    dayArray.forEach((day) => {
      if ((day === 'segunda') || (day === 'segunda-feira')) {
        answerArray.push(1);
      }

      if ((day === 'terça') || (day === 'terça-feira')) {
        answerArray.push(2);
      }

      if ((day === 'quarta') || (day === 'quarta-feira')) {
        answerArray.push(3);
      }

      if ((day === 'quinta') || (day === 'quinta-feira')) {
        answerArray.push(4);
      }

      if ((day === 'sexta') || (day === 'sexta-feira')) {
        answerArray.push(5);
      }

      if ((day === 'sábado') || (day === 'sabado')) {
        answerArray.push(6);
      }

      if (day === 'domingo') {
        answerArray.push(0);
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
