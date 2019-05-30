/* eslint-disable import/no-unmockUserolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const app = require('../index');
const routes = require('../routes/router')(app);
const notification = require('../routes/gaiaNotificaRouter');
const notify = require('../routes/gaiaNotifyRouter');

const should = chai.should();

const mockUser = {
  telegramId: 'testId2',
  sport: '',
  local: '',
  notificationDays: [''],
  notificationTime: [''],
};

describe('/POST registerUser', () => {
  it('Register User', () => {
    mockUser.should.be.a('object');
    mockUser.telegramId.should.eql('testId2');
    mockUser.sport.should.eql('');
    mockUser.local.should.eql('');
    mockUser.notificationDays.should.eql(['']);
    mockUser.notificationTime.should.eql(['']);
  }).timeout(5000);
});
