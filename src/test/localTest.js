/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const chai = require('chai');
const local = require('../routes/gaiaLocalRouter');

const should = chai.should();

const listJson = [
  {
    name: 'Brazil',
    lat: -10.3333333,
    lng: -53.2,
  },
];

const localJson = { lat: -24.4842187, lng: -51.8148872 };

describe('List', () => {
  it('get List Latitude', () => {
    const { lat } = listJson[0];
    should.equal(lat, -10.3333333);
  }).timeout(5000);

  it('get List Longitude', () => {
    const { lng } = listJson[0];
    should.equal(lng, -53.2);
  }).timeout(5000);

  it('get Coords Latitude', () => {
    localJson.should.be.a('Object');
    localJson.lat.should.eql(-24.4842187);
  }).timeout(5000);

  it('get Coords Longitude', () => {
    localJson.should.be.a('Object');
    localJson.lng.should.eql(-51.8148872);
  }).timeout(5000);
});
