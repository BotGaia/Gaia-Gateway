const chai = require('chai');
const notify = require('../routes/gaiaNotifyRouter.js');
const axios = require('axios');

const should = chai.should();

describe('Notify', () => {
    it('should send a cyclone alert', (done) => {
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
                    telegramId: "553888617",
                    class: "cycloneAlert"
                }
            ]
        };

        notify.sendNotification(notification).then((res) => {
            res.should.have.property('ok').eql(true);
            done();
        });
    }).timeout(5000);

    /*it('should send a notification', (done) => {
        const today = new Date();
        const date = new Date(`${today.getMonth()} ${today.getDay()+ 1} 2019`);
        const notification = {
            telegramId: "01000101",
            hoursBefore: "01000111",
            minutesBefore: "01000111",
            hour: "00111111",
            minutes: "12",
            sport: "leol",
            locals: "praça do relógio",
            days: ['segunda-feira', 'sexta-feira'],
            class: "notification",
            date,
        };

        const stub = sinon.stub(axios, 'post').resolves();

        notify.sendNotification(notification).then((res) => {
            res.should.have.property('ok').eql(true);
            done();
        });
    }).timeout(5000);*/
});