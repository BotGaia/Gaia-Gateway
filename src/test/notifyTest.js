const chai = require('chai');
const notify = require('../routes/gaiaNotifyRouter.js');
const axios = require('axios');
const sinon = require('sinon');

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
                    windSpeed: undefined,
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

    it('should send a notification', (done) => {
        const stub = sinon.stub(axios, 'post');
        const date = new Date('2019-06-21T15:45:42.477Z');
        const notification = {
            telegramId: "553888617",
            hoursBefore: "01000111",
            minutesBefore: "01000111",
            hour: "00111111",
            minutes: "12",
            sport: "kitesurf",
            locals: ["praça do relógio"],
            days: ['segunda-feira', 'sexta-feira'],
            day: date.getDay(),
            month: date.getMonth(),
            class: "notification",
            date,
        };
        const getResponse = {
            data: [
                {
                  sportResult: "not",
                  weather: {
                    date: "sexta-feira 18:00:00",
                    sky: "céu limpo",
                    temperature: "26.95",
                    pressure: "1.00",
                    windyDegrees: "norte",
                    windySpeed: "1.55",
                    temperatureMax: "26.95",
                    temperatureMin: "26.95",
                    humidity: "45"
                  }
                }
            ]
        }

        stub.withArgs(`${global.URL_SPORT}/sportForecast`, notification)
                .resolves(getResponse);

        notify.sendNotification(notification).then((res) => {
            res.should.have.property('ok').eql(true);
            done();
        });

        stub.restore();
    }).timeout(15000);

    it('should not send a cyclone alert', (done) => {
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
            users: {psyche: "hehe"}
        };

        notify.sendNotification(notification).then((res) => {
            res.should.be.a('Object');
            res.should.have.property('ok').eql(false);
            res.should.have.property('error');
            done();
        });
    });

    it('should not send a notification', (done) => {
        const stub = sinon.stub(axios, 'post');
        const date = new Date('2019-06-21T15:45:42.477Z');
        const notification = {
            telegramId: "notanidseriously",
            hoursBefore: "01000111",
            minutesBefore: "01000111",
            hour: "00111111",
            minutes: "12",
            sport: "kitesurf",
            locals: ["praça do relógio"],
            days: ['segunda-feira', 'sexta-feira'],
            day: date.getDay(),
            month: date.getMonth(),
            class: "notification",
            date,
        };
        const getResponse = {
            data: [
                {
                  sportResult: "not",
                  weather: {
                    date: "sexta-feira 18:00:00",
                    sky: "céu limpo",
                    temperature: "26.95",
                    pressure: "1.00",
                    windyDegrees: "norte",
                    windySpeed: "1.55",
                    temperatureMax: "26.95",
                    temperatureMin: "26.95",
                    humidity: "45"
                  }
                }
            ]
        }

        stub.withArgs(`${global.URL_SPORT}/sportForecast`, notification)
                .resolves(getResponse);

        notify.sendNotification(notification).then((res) => {
            res.should.be.a('Object');
            res.should.have.property('ok').eql(false);
            res.should.have.property('error');
            done();
        });

        stub.restore();
    });

    it('should not send a notification', (done) => {
        const date = new Date('2019-06-21T15:45:42.477Z');
        const notification = {
            telegramId: "notanidseriously",
            hoursBefore: "01000111",
            minutesBefore: "01000111",
            hour: "00111111",
            minutes: "12",
            sport: "kitesurf",
            locals: ["praça do relógio"],
            days: ['segunda-feira', 'sexta-feira'],
            day: date.getDay(),
            month: date.getMonth(),
            class: "notification",
            date,
        };

        notify.sendNotification(notification).then((res) => {
            res.should.be.a('Object');
            res.should.have.property('ok').eql(false);
            res.should.have.property('error');
            done();
        });
    });
});