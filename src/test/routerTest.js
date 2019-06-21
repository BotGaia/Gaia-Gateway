/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const sinon = require('sinon');
const axios = require('axios');
const chaiHttp = require('chai-http');
const app = require('../index');
const esporte = require('../routes/gaiaEsporteRouter');
const ciclone = require('../routes/gaiaCicloneRouter');
const notify = require('../routes/gaiaNotifyRouter');

chai.use(chaiHttp);

const should = chai.should();

describe('Root router', () => {
  let notifyStub;

  before(() => {
    notifyStub = sinon.stub(notify, 'sendNotification');
  });

  after(() => {
    notifyStub.restore();
  });

  it('should return ok', (done) => {
    notifyStub.resolves({ ok: true });

    chai.request(app).post('/')
      .send({
        cyclones: [
          {
            name: 'Fast boy',
            originBasin: 'Every',
            currentBasin: 'Where',
            startDate: '00/00/0000',
            endDate: '31/12/9999',
            stormType: 'Sonic Boom',
            windSpeed: '9001',
            class: 'cyclone',
          },
        ],
        users: [
          {
            telegramId: '12254862',
            class: 'cycloneAlert',
          },
        ],
      }).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Object');
        res.body.should.have.property('ok').eql(true);
        done();
      });
  });

  it('should return an authentication error', (done) => {
    chai.request(app).post('/')
      .send({
        users: [
          {
            telegramId: '12254862',
            class: 'cycloneAlert',
          },
        ],
      }).end((err, res) => {
        res.should.have.status(200);
        res.text.should.be.a('String');
        done();
      });
  });

  it('should return endpoints', (done) => {
    chai.request(app).get('/').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Array');
      done();
    });
  });
});

describe('Esporte Router', () => {
  let esporteStub; let
    notifyStub;

  before(() => {
    esporteStub = sinon.stub(esporte);
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
      name: 'Gama, Região Integrada de Desenvolvimento do Distrito Federal e Entorno, Brasil',
      lat: -16.0170857,
      lng: -48.0653054,
    }]);

    chai.request(app).get('/esporte')
      .query({ local: 'gama df' }).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Array').that.has.lengthOf(1);
        done();
      });
  });

  it('should return climate information', (done) => {
    esporteStub.getClimate.resolves({
      date: 'sexta-feira 17:35:12',
      sky: 'poucas nuvens',
      temperature: '26.75',
      pressure: '1.00',
      windyDegrees: 'norte',
      windySpeed: '1.52',
      temperatureMax: '26.75',
      temperatureMin: '26.75',
      humidity: '44',
      name: '',
      sunrise: '6:48:57',
      sunset: '18:20:04',
    });

    chai.request(app).get('/esporte')
      .query({ intent: 'climate', place: 'brasilia' }).end((err, res) => {
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
      alert: [],
    });

    chai.request(app).get('/esporte')
      .query({ intent: 'sports', place: 'brasilia' }).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Object');
        res.body.should.have.property('favorable');
        done();
      });
  });

  it('should return a confirmation for a deleted notification', (done) => {
    esporteStub.deleteNotification.resolves({});

    chai.request(app).get('/esporte')
      .query({ id: 'realIdNoJoke', number: '0' }).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Object');
        done();
      });
  });

  it('should return a notification', (done) => {
    esporteStub.getNotification.resolves([
      {
        days: [
          1,
        ],
        locals: [
          'rio de janeiro',
        ],
        _id: '5d0cfba647458b001d8dc971',
        class: 'notification',
        telegramId: '553888617',
        sport: 'kitesurf',
        hour: 12,
        minutes: 12,
        hoursBefore: 10,
        minutesBefore: 0,
        date: '2019-06-21T12:45:42.477Z',
        __v: 0,
      },
    ]);

    chai.request(app).get('/esporte')
      .query({ id: '553888617' }).end((err, res) => {
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

  it('should return an authentication error', (done) => {
    esporteStub.getClimate.resolves(`IntentError: Expected Intent to be equal to
            'sports' or 'climate' or 'delete' or 'show', but instead got 'anattemptwasmade'.`);

    chai.request(app).get('/esporte')
      .query({ intent: 'trueintent', place: 'brasilia' }).end((err, res) => {
        res.should.have.status(200);
        res.text.should.be.a('String');
        done();
      });
  });

  it('should return a notification post confirmation', (done) => {
    esporteStub.postNotification.resolves({
      days: [
        1,
        5,
      ],
      locals: [
        'praça do relógio',
      ],
      _id: '5d0d469947458b001d8dc999',
      class: 'notification',
      telegramId: '12455',
      sport: 'kitesurf',
      hour: 23,
      minutes: 12,
      hoursBefore: 2,
      minutesBefore: 11,
      date: '2019-06-21T18:05:29.247Z',
      __v: 0,
    });

    chai.request(app).post('/esporte')
      .send({
        telegramId: '12455',
        hoursBefore: '21',
        minutesBefore: '1',
        hour: '23',
        minutes: '12',
        sport: 'kitesurf',
        locals: 'praça do relógio',
        days: ['segunda-feira', 'sexta-feira'],
      }).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Object');
        res.body.should.have.property('days');
        done();
      });
  });

  it('should return an authentication error', (done) => {
    chai.request(app).post('/esporte')
      .send({
        hoursBefore: '21',
        minutesBefore: '1',
        hour: '23',
        minutes: '12',
        sport: 'kitesurf',
        locals: 'praça do relógio',
        days: ['segunda-feira', 'sexta-feira'],
      }).end((err, res) => {
        res.should.have.status(200);
        res.text.should.be.a('String');
        done();
      });
  });
});

describe('Ciclone Router', () => {
  let cicloneStub;

  before(() => {
    cicloneStub = sinon.stub(ciclone);
  });

  after(() => {
    cicloneStub.getCycloneAlert.restore();
    cicloneStub.deleteCycloneAlert.restore();
    cicloneStub.postCycloneAlert.restore();
    cicloneStub.getAllCyclones.restore();
  });

  it('should return a cyclone alert post confirmation', (done) => {
    cicloneStub.postCycloneAlert.resolves({
      _id: '5d0d4c0c39cda7001d80acca',
      class: 'cycloneAlert',
      telegramId: '1532479',
      __v: 0,
    });

    chai.request(app).post('/ciclone')
      .send({
        telegramId: '1532479',
      }).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Object');
        res.body.should.have.property('telegramId');
        done();
      });
  });

  it('should return a cyclone alert', (done) => {
    cicloneStub.getCycloneAlert.resolves({
      _id: '5d0d4c0c39cda7001d80acca',
      class: 'cycloneAlert',
      telegramId: '1532479',
      __v: 0,
    });

    chai.request(app).get('/ciclone')
      .query({ intent: 'show', id: '1532479' }).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Object');
        res.body.should.have.property('class');
        done();
      });
  });

  it('should return a cyclone alert deletion confirmation', (done) => {
    cicloneStub.deleteCycloneAlert.resolves({
      _id: '5d0d4c0c39cda7001d80acca',
      class: 'cycloneAlert',
      telegramId: '1532479',
      __v: 0,
    });

    chai.request(app).get('/ciclone')
      .query({ intent: 'delete', id: '1532479' }).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Object');
        res.body.should.have.property('class');
        done();
      });
  });

  it('should return all cyclones', (done) => {
    cicloneStub.getAllCyclones.resolves([]);

    chai.request(app).get('/ciclone')
      .query({ intent: 'allCyclones' }).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Array').that.has.lengthOf(0);
        done();
      });
  });

  it('should return an authentication error', (done) => {
    chai.request(app).post('/ciclone').end((err, res) => {
      res.should.have.status(200);
      res.text.should.be.a('String');
      done();
    });
  });
});

describe('Notify router', () => {

});
