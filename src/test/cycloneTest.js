const chai = require('chai');
const ciclone = require('../routes/gaiaCicloneRouter.js');
const sinon = require('sinon');
const axios = require('axios');

const should = chai.should();

describe('Ciclone', () => {
    let getStub;

    before(() => {
        getStub = sinon.stub(axios, 'get');
    });

    it('should post a cyclone alert', (done) => {
        const stub = sinon.stub(axios, 'post');
        const requestBody = {
            telegramId: 553888617,
        }
        const getResponse = {
            data: {
                _id: '5d072769f4a6ac001dca14fd',
                class: 'cycloneAlert',
                telegramId: '553888617',
                __v: 0
            }
        }

        stub.resolves(getResponse);

        ciclone.postCycloneAlert(requestBody).then((res) => {
            res.should.be.a('Object');
            res.should.have.property('class').eql('cycloneAlert');
            res.should.have.property('telegramId').eql('553888617');
            done();
        });

        stub.restore();
    });

    it('should get a cyclone alert', (done) => {
        const params = {
            id: 553888617,
        }

        getStub.withArgs(`${global.URL_CYCLONE}/userCycloneAlert`, { params })
          .resolves({data: 'Alerta de ciclone existente'});

        ciclone.getCycloneAlert(553888617).then((res) => {
            res.should.be.a('String').that.is.equal('Alerta de ciclone existente');
            done();
        });
    });

    it('should not post a cyclone alert', (done) => {
        const requestBody = {
            telegramId: 553888617,
        }

        ciclone.postCycloneAlert(requestBody).then((res) => {
            res.should.have.property('code');
            res.code.should.be.a('String').that.is.oneOf(['ECONNREFUSED', 'ENOTFOUND']);
            done();
        });
    });

    it('should not get a cyclone alert', (done) => {
        getStub.restore();

        ciclone.getCycloneAlert(553888617).then((res) => {
            res.should.have.property('code');
            res.code.should.be.a('String').that.is.oneOf(['ECONNREFUSED', 'ENOTFOUND']);
            done();
        });
    });
});