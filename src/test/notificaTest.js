/* eslint-disable import/no-unpostDataolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const app = require('../index');
const routes = require('../routes/router')(app);

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
      postData.should.have.status(200);
      postData.body.should.be.a('object');
      postData.body.user.telegramId.should.eql('testId2');
      postData.body.user.sport.should.eql('');
      postData.body.user.local.should.eql('');
      postData.body.user.notificationDays.should.eql([['']]);
      postData.body.user.notificationTime.should.eql([['']]);
      done();
    });
  }).timeout(5000);
});
