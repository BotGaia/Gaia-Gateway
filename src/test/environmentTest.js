const chai = require('chai');
const environment = require('../config/environment');

const should = chai.should();

describe('Environment', () => {
    it('should config sport', (done) => {
        let currentEnv = process.env.ENVIRONMENT;
        const enviroments = [{env: 'dev', URL: `http://${process.env.IP_ADDRESS}:3000`},
        {env: 'homolog', URL: 'https://esporte.hml.botgaia.ga'},
        {env: 'prod', URL: 'https://esporte.botgaia.ga'}];

        enviroments.forEach((value) => {
            process.env.ENVIRONMENT = value.env;
            environment.configSport();

            global.URL_SPORT.should.be.equal(value.URL);
        });

        process.env.ENVIRONMENT = currentEnv;
        environment.configSport();
        done();
    });

    it('should config cyclone', (done) => {
        let currentEnv = process.env.ENVIRONMENT;
        const enviroments = [{env: 'dev', URL: `http://${process.env.IP_ADDRESS}:3001`},
        {env: 'homolog', URL: 'https://ciclone.hml.botgaia.ga'},
        {env: 'prod', URL: 'https://ciclone.botgaia.ga'}];

        enviroments.forEach((value) => {
            process.env.ENVIRONMENT = value.env;
            environment.configCyclone();

            global.URL_CYCLONE.should.be.equal(value.URL);
        });

        process.env.ENVIRONMENT = currentEnv;
        environment.configCyclone();
        done();
    });
});