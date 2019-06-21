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
            days: 15344,
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
        const userOne = {
            telegramId: {astring: "Wait, what"},
        };
        const userTwo = {};
        const errorMessageOne = auth.cycloneAuthentication(userOne);
        const errorMessageTwo = auth.cycloneAuthentication(userTwo);
        
        errorMessageOne.should.be.a('String');
        errorMessageTwo.should.be.a('String');
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

describe('Notify authentication', () => {
    it('should not redirect cyclone notify request', (done) => {
        const notification = {
            users: [
                {
                    telegramId: "12254862",
                    class: "cycloneAlert"
                }
            ]
        };
        const errorMessage = auth.notifyAuthentication(notification);
        
        errorMessage.should.be.a('String');
        done();
    });

    it('should redirect cyclone notify request', (done) => {
        const notification = {
            cyclones: [
                {
                    name: "Fast boy",
                    originBasin: "Every",
                    currentBasin: "Where",
                    startDate: "00/00/0000",
                    endDate: "31/12/9999",
                    stormType: "Sonic Boom",
                    windSpeed: "9001",
                    class: "cyclone"
                }
            ],
            users: [
                {
                    telegramId: "12254862",
                    class: "cycloneAlert"
                }
            ]
        };
        const errorMessage = auth.notifyAuthentication(notification);

        errorMessage.should.be.false;
        done();
    });

    it('should not redirect notification notify request', (done) => {
        const notification = {
            class: 333,
        };
        const errorMessage = auth.notifyAuthentication(notification);
        
        errorMessage.should.be.a('String');
        done();
    });

    it('should redirect notification notify request', (done) => {
        const notification = {
            class: "notification",
            date: "12/12/12",
        };
        const errorMessage = auth.notifyAuthentication(notification);

        errorMessage.should.be.false;
        done();
    });
});