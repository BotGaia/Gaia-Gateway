const chai = require('chai');
const notify = require('../routes/gaiaNotifyRouter.js');

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
});