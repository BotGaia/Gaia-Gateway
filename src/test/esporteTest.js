const chai = require('chai');
const esporte = require('../routes/gaiaEsporteRouter.js');
const sinon = require('sinon');
const axios = require('axios');

const should = chai.should();

describe('Esporte', () => {
    let getStub, postStub;
    
    before(() => {
      getStub = sinon.stub(axios, 'get');
      postStub = sinon.stub(axios, 'post');
    });

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
        
        getStub.withArgs(`${global.URL_SPORT}/climate`, { params })
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
    });
    
    it('should get a locations list', (done) => {
      const params = {
          local: 'brasilia',
        };
      const getResponse = {
        data: [
          {
            name: 'Brasil',
            lat: -10.3333333,
            lng: -53.2
          },
          {
            name: 'Distrito Federal, Brasil',
            lat: -15.7754462,
            lng: -47.7970891
          },
          {
            name: 'Brasilia, El Jardín, Perimetro Urbano Pereira, Colômbia',
            lat: 4.81159,
            lng: -75.7060118
          },
          {
            name: 'São Roberto, Brasilia, Microrregião de Salgado, Brasil',
            lat: -0.8953167,
            lng: -47.476385
          },
          {
            name: 'Abaetetuba, Brasilia, Microrregião de Cametá, Brasil',
            lat: -1.9188283,
            lng: -48.9031217
          },
          {
            name: 'Lagarto, Brasilia, Microrregião do Centro Sul Sergipano, Brasil',
            lat: -10.8979152,
            lng: -37.5523998
          },
          {
            name: 'Alto Alegre, Brasilia, Microrregião de Boa Vista, Brasil',
            lat: 3.1827175,
            lng: -61.2181741
          },
          {
            name: 'Brasilia, Meta, Colômbia',
            lat: 3.746319,
            lng: -73.7304833
          },
          {
            name: 'La Brasilia, Arauca, Colômbia',
            lat: 6.9881247,
            lng: -71.4934902
          }
        ]
      };
        
      getStub.withArgs(`${global.URL_SPORT}/listLocales`, { params })
          .resolves(getResponse);
      
      esporte.getLocal('brasilia').then((res) => {
        res.should.be.a('Array');
        res[0].should.have.property('name').eql('Brasil');
        res[0].should.have.property('lat').eql(-10.3333333);
        res[0].should.have.property('lng').eql(-53.2);
        done();
      });
    });

    it('should post a notification', (done) => {
      const requestBody = {
        telegramId: '553888617',
        days: 'segunda-feira',
        minutesBefore: '12',
        hoursBefore: '2',
        hour: '12',
        minutes: '12',
        sport: 'kitesurf',
        locals: 'rio de janeiro'
      };
      const getResponse = {
        data: {
          days: [
            1
          ],
          locals: [
            'rio de janeiro'
          ],
          _id: '5d0ceffd47458b001d8dc96f',
          class: 'notification',
          telegramId: '553888617',
          sport: 'kitesurf',
          hour: 12,
          minutes: 12,
          hoursBefore: 10,
          minutesBefore: 0,
          date: '2019-06-21T11:55:57.482Z',
          __v: 0
        }
      };
        
      postStub.resolves(getResponse);
      
      esporte.postNotification(requestBody).then((res) => {
        res.should.be.a('Object');
        res.should.have.property('days');
        res.should.have.property('locals');
        res.should.have.property('class').eql('notification');
        res.should.have.property('date').eql('2019-06-21T11:55:57.482Z');
        done();
      });
    });

    it('should not get climate information', (done) => {
      getStub.restore();

      esporte.getClimate('shameonyou', 'brasilia').then((res) => {
        res.should.be.a('Object');
        res.should.have.property('cod').eql(400);
        done();
      });
    });
    
    it('should not get a locations list', (done) => {
      esporte.getClimate('shameonyou', 'brasilia').then((res) => {
        res.should.be.a('Object');
        res.should.have.property('cod').eql(400);
        done();
      });
    });

    it('should not post a notification', (done) => {
      const requestBody = {
        telegramId: '553888617',
        days: 'segunda-feira',
        minutesBefore: '12',
        hoursBefore: '2',
        hour: '12',
        minutes: '12',
        sport: 'kitesurf',
        locals: 'rio de janeiro'
      };

      postStub.restore();

      esporte.postNotification(requestBody).then((res) => {
        res.should.be.a('Object');
        res.should.have.property('cod').eql(400);
        done();
      });
    });
});