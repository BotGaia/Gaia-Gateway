const chai = require('chai');
const esporte = require('../routes/gaiaEsporteRouter.js');
const sinon = require('sinon');
const axios = require('axios');

const should = chai.should();

describe('Esporte', () => {
    it('should get climate information', (done) => {
        const params = {
            place: 'brasilia',
        };
        const getResponse = {
            data: {
                date: "sexta-feira 21:24:55",
                sky: "nuvens dispersas",
                temperature: "23.14",
                pressure: "1.00",
                windyDegrees: "norte",
                windySpeed: "1.14",
                temperatureMax: "23.14",
                temperatureMin: "23.14",
                humidity: "61",
                name: "",
                sunrise: "6:48:44",
                sunset: "18:19:52"
            }
        };
        
        const stub = sinon.stub(axios, 'get');
        stub.withArgs(`${global.URL_SPORT}/climate`, { params })
            .resolves(getResponse);

        esporte.getClimate('climate', 'brasilia').then((res) => {
            res.should.be.a('Object');
            res.should.have.property('date');
            res.should.have.property('sky');
            res.should.have.property('temperature');
            res.should.have.property('pressure');
            res.should.have.property('windyDegrees');
            res.should.have.property('windySpeed');
            res.should.have.property('temperatureMax');
            res.should.have.property('temperatureMin');
            res.should.have.property('humidity');
            res.should.have.property('name');
            res.should.have.property('sunrise');
            res.should.have.property('sunset');
            done();
        });

        stub.restore();
    });
});