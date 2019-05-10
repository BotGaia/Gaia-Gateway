/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const chai = require('chai');
const local = require('../routes/gaiaLocalRouter');

const should = chai.should();

describe('List', () => {
  it('get Latitude', (done) => {
    local.getLocal('listLocales', 'brasilia').then((value) => {
      const { lat } = value[0];
      should.equal(lat, -10.3333333);
      done();
    });
  }).timeout(5000);

  it('get Longitude', (done) => {
    local.getLocal('listLocales', 'brasilia').then((value) => {
      const { lng } = value[0];
      should.equal(lng, -53.2);
      done();
    });
  }).timeout(5000);
});

describe('Coords', () => {
  it('get Latitude', (done) => {
    local.getLocal('local', 'parana').then((value) => {
      value.should.be.a('Object');
      done();
    });
  }).timeout(5000);

  it('get Longitude', (done) => {
    local.getLocal('local', 'parana').then((value) => {
      value.should.be.a('Object');
      done();
    });
  }).timeout(5000);
});
