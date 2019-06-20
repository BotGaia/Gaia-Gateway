const chai = require('chai');
const auth = require('../utils/requestAuthenticationUtils.js');

const should = chai.should();

describe('GET authentication', () => {
    it('should not redirect request', (done) => {
        const query = {intent: "roleplay"};
        const errorMessage = auth.getAuthentication(query);

        errorMessage.should.be.a('String');
        done();
    });

    it('should redirect request', (done) => {
        const query = {intent: "climate"};
        const errorMessage = auth.getAuthentication(query);

        errorMessage.should.be.false;
        done();
    });
});

describe('POST authentication', () => {
    it('should not redirect notification', (done) => {
        const notification = {
            telegramId: "01000101",
            hoursBefore: "01000001",
            minutesBefore: "01010011",
            hour: "01010100",
            minutes: "01000101",
            sport: "01010010",
            locals: 333,
            days: 'I am totally an Array, I swear',
        };
        const errorMessage = auth.notificationAuthentication(notification);

        errorMessage.should.be.a('String');
        done();
    });

    it('should redirect notification', (done) => {
        const notification = {
            telegramId: "01000101",
            hoursBefore: "01000111",
            minutesBefore: "01000111",
            hour: "00111111",
            minutes: "12",
            sport: "leol",
            locals: "praça do relógio",
            days: ['segunda-feira', 'sexta-feira'],
        };
        const errorMessage = auth.notificationAuthentication(notification);

        errorMessage.should.be.false;
        done();
    });
});

describe('Cyclone Alert authentication', () => {
    it('should not redirect cyclone alert', (done) => {
        const user = {
            telegramId: {astring: "Wait, what"},
        };
        const errorMessage = auth.cycloneAuthentication(user);
        
        errorMessage.should.be.a('String');
        done();
    });

    it('should redirect cyclone alert', (done) => {
        const user = {
            telegramId: "1532479",
        };
        const errorMessage = auth.cycloneAuthentication(user);

        errorMessage.should.be.false;
        done();
    });
});