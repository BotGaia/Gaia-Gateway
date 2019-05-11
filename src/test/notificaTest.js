/* eslint-disable import/no-unpostDataolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const app = require('../index');
const routes = require('../routes/router')(app);
const notification = require('../routes/gaiaNotificaRouter');

const should = chai.should();

describe('/POST registerUser', () => {
  it('Register User', (done) => {
    const mockJson = {
      telegramId: 'testId2',
      sport: '',
      local: '',
      notificationDays: [''],
      notificationTime: [''],
    };
    notification.postNotification('registerUser', mockJson).then((postData) => {
      postData.should.be.a('object');
      postData.user.telegramId.should.eql('testId2');
      postData.user.sport.should.eql('');
      postData.user.local.should.eql('');
      postData.user.notificationDays.should.eql([['']]);
      postData.user.notificationTime.should.eql([['']]);
      done();
    });
  }).timeout(5000);
});
