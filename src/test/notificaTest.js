/* eslint-disable import/no-unmockJsonolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const app = require('../index');
const routes = require('../routes/router')(app);
const notification = require('../routes/gaiaNotificaRouter');

const should = chai.should();

const mockJson = {
  telegramId: 'testId2',
  sport: '',
  local: '',
  notificationDays: [''],
  notificationTime: [''],
};

describe('/POST registerUser', () => {
  it('Register User', () => {
    mockJson.should.be.a('object');
    mockJson.telegramId.should.eql('testId2');
    mockJson.sport.should.eql('');
    mockJson.local.should.eql('');
    mockJson.notificationDays.should.eql(['']);
    mockJson.notificationTime.should.eql(['']);
  }).timeout(5000);
});
