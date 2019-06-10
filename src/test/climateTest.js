/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const esporte = require('../routes/gaiaEsporteRouter');

const should = chai.should();

chai.use(chaiHttp);

const climateJson = {
  cod: '400',
  description: 'clear sky',
  temp: '25',
  main: 'Clouds',
};

const sportJson = {
  reservation: [
    {
      temperature: { limitArray: [{ upperLimit: '24', lowerLimit: '15' }] },
      humidity: { limitArray: [{ upperLimit: '70', lowerLimit: '21' }] },
      windSpeed: {
        limitArray: [{ upperLimit: '10.28', lowerLimit: '0' },
          { upperLimit: '25.7', lowerLimit: '15.934' }],
      },
      _id: '5cd5cf67bcc4ea0029614e6a',
      name: 'Kitesurf',
      class: 'sport',
      __v: 0,
    }],
};

const sportsJson = [
  {
    temperature: { limitArray: [{ upperLimit: '3000', lowerLimit: '3000' }] },
    humidity: { limitArray: [{ upperLimit: '3000', lowerLimit: '3000' }] },
    windSpeed: { limitArray: [{ upperLimit: '3000', lowerLimit: '3000' }] },
    _id: '5cd5cf66bcc4ea0029614e68',
    name: 'sportTest2',
    class: 'sport',
    __v: 0,
  },
];


describe('GET climate', () => {
  it('Should get a weather object', () => {
    climateJson.should.be.a('Object');
  }).timeout(5000);

  it('Invalid or missing parameter', () => {
    climateJson.should.be.a('Object');
    climateJson.should.have.property('cod').eql('400');
  }).timeout(5000);

  it('Unexisting location', () => {
    climateJson.should.be.a('Object');
    climateJson.should.have.property('cod').eql('400');
  }).timeout(5000);

  it('Should get a sport object', () => {
    sportJson.should.be.a('Object');
  }).timeout(5000);

  it('Should get all sports objects', () => {
    sportsJson.should.be.a('Array');
  }).timeout(5000);
});
