const chai = require('chai');
const sinon = require('sinon');
const axios = require('axios');
const app = require('../index');
const esporte = require('../routes/gaiaEsporteRouter');
const ciclone = require('../routes/gaiaCicloneRouter');
const notify = require('../routes/gaiaNotifyRouter');
const chaiHttp = require('chai-http');

const should = chai.should();

describe('Root router', () => {
    it('should return endpoints');
});
describe('Esporte Router', () => {
    let esporteStub, cicloneStub, notifyStub;

    before(() => {
        esporteStub = sinon.stub(esporte);
        //cicloneStub = sinon.stub(ciclone);
        //notifyStub = sinon.stub(notify);
    });

    after(() => {
        esporteStub.getClimate.restore();
        esporteStub.getLocal.restore();
        esporteStub.postNotification.restore();
        esporteStub.deleteNotification.restore();
        esporteStub.getNotification.restore();
    });

    it('should return a locations list', (done) => {
        esporteStub.getLocal.resolves([{
            name: "Gama, Região Integrada de Desenvolvimento do Distrito Federal e Entorno, Brasil",
            lat: -16.0170857,
            lng: -48.0653054
        }]);
        
        chai.request(app).get('/esporte')
            .query({local: 'gama df'}).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('Array').that.has.lengthOf(1);
            done();
        });
    });

    it('should return climate information', (done) => {
        esporteStub.getClimate.resolves({
            date: "sexta-feira 17:35:12",
            sky: "poucas nuvens",
            temperature: "26.75",
            pressure: "1.00",
            windyDegrees: "norte",
            windySpeed: "1.52",
            temperatureMax: "26.75",
            temperatureMin: "26.75",
            humidity: "44",
            name: "",
            sunrise: "6:48:57",
            sunset: "18:20:04"
          });
        
        chai.request(app).get('/esporte')
            .query({intent: 'climate', place: 'brasilia'}).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('Object');
            res.body.should.have.property('date');
            done();
        });
    });

    it('should return sport information', (done) => {
        esporteStub.getClimate.resolves({
            favorable: [],
            reservartion: [],
            alert: []
        });
        
        chai.request(app).get('/esporte')
            .query({intent: 'sports', place: 'brasilia'}).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('Object');
            res.body.should.have.property('favorable');
            done();
        });
    });

    it('should return a confirmation for a deleted notification', (done) => {
        esporteStub.deleteNotification.resolves({});
        
        chai.request(app).get('/esporte')
            .query({id: 'realIdNoJoke', number: '0'}).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('Object');
            done();
        });
    });

    it('should return a notification', (done) => {
        esporteStub.getNotification.resolves([
            {
              days: [
                1
              ],
              locals: [
                "rio de janeiro"
              ],
              _id: "5d0cfba647458b001d8dc971",
              class: "notification",
              telegramId: "553888617",
              sport: "kitesurf",
              hour: 12,
              minutes: 12,
              hoursBefore: 10,
              minutesBefore: 0,
              date: "2019-06-21T12:45:42.477Z",
              __v: 0
            }
          ]);
        
        chai.request(app).get('/esporte')
            .query({id: '553888617'}).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('Array').that.has.lengthOf(1);
            res.body[0].should.have.property('days');
            done();
        });
    });

    it('should return endpoints', (done) => {
        chai.request(app).get('/esporte')
            .query({}).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('Array');
            done();
        });
    });

    it('should return a authentication error', (done) => {
        esporteStub.getClimate.resolves(`IntentError: Expected Intent to be equal to
            'sports' or 'climate' or 'delete' or 'show', but instead got 'anattemptwasmade'.`);
        
        chai.request(app).get('/esporte')
            .query({intent: 'climate', place: 'brasilia'}).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('String');
            done();
        });
    });
});