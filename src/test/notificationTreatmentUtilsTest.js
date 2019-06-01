/* eslint-disable import/no-unmockUserolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const notification = require('../utils/notificationTreatmentUtils');

const should = chai.should();

describe('NOTIFICATION TREATMENT UTILS', () => {
  it('should convert days to integers', () => {
    const days = ["segunda", "sábado"];
    const convertedDays = notification.convertDay(days);

    convertedDays.should.be.a('Array');
    convertedDays.length.should.be.eql(2);
    convertedDays[0].should.be.eql(1);
    convertedDays[1].should.be.eql(6);
  }).timeout(5000);

  it('should convert a string to an integer', () => {
    const hourString = "11 horas";
    const hourInteger = notification.convertTimeBefore(hourString);

    hourInteger.should.be.a('Number');
    hourInteger.should.be.eql(11);
  }).timeout(5000);
});
