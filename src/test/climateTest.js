/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const climate = require('../routes/gaiaClimaRouter');

const should = chai.should();

chai.use(chaiHttp);

describe('GET climate', () => {
  it('should get a weather object', (done) => {
    climate.getClimate('climate', 'brasilia').then((climateJson) => {
      climateJson.should.be.a('Object');
      done();
    });
  }).timeout(5000);
});

describe('Invalid or missing parameter', () => {
  it('should return a 400 error', (done) => {
    climate.getClimate('climate', '').then((climateJson) => {
      climateJson.should.be.a('Object');
      climateJson.should.have.property('cod').eql('400');
      done();
    });
  }).timeout(5000);
});

describe('Unexisting location', () => {
  it('should return a 400 error', (done) => {
    climate.getClimate('climate', 'ayuwoki').then((climateJson) => {
      climateJson.should.be.a('Object');
      climateJson.should.have.property('cod').eql('400');
      done();
    });
  }).timeout(5000);
});

describe('GET sport', () => {
  it('should get a sport object', (done) => {
    climate.getClimate('sports', 'parana').then((sportJson) => {
      sportJson.should.be.a('Object');
      done();
    });
  }).timeout(5000);
});

describe('GET all sports', () => {
  it('should get all sports objects', (done) => {
    climate.getClimate('allSports', '').then((sportJson) => {
      sportJson.should.be.a('Array');
      done();
    });
  }).timeout(5000);
});
