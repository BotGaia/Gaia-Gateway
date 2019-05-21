[![pipeline status](https://gitlab.com/botgaia/Gaia-Gateway/badges/master/pipeline.svg)](https://gitlab.com/botgaia/Gaia-Gateway/commits/master)
[![coverage report](https://gitlab.com/botgaia/Gaia-Gateway/badges/master/coverage.svg)](https://gitlab.com/botgaia/Gaia-Gateway/commits/master)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

# Gaia-Gateway

## Objetivo

Esse serviço é responsável por fazer toda a ponte da Gaia, um chatbot, com os microsserviços.

## Como contribuir

Se tiver interesse em como contribuir para o projeto, olhe nossa [wiki](https://github.com/fga-eps-mds/2019.1-Gaia).

## Como usar

### Como rodar

O nosso projeto utiliza o Docker e o Docker Compose como ferramentas de desenvolvimento. Para instalar eles, siga o tutorial no site oficial do [Docker](https://www.docker.com/).

Após instalar o docker rode o projeto como desenvolvimento da seguinte maneira:

``` $ sudo docker build -t gaiagateway . ```

Após o build, rode esse outro comando:

```$ sudo docker run --rm -it -p 3002:3002 -v $PWD:/app -v /app/node_modules gaiagateway```

Para rodar os testes, utilize:

``` $ sudo docker run --rm -v $PWD:/app -v /app/node_modules gaiagateway npm run test ```

Para rodar a folha de estilo, utilize este comando:

``` $ sudo docker run --rm -v $PWD:/app -v /app/node_modules gaiagateway npm run lint ```

### Endpoints

Aqui se encontra todos os endpoints desse serviço. Todos os endpoints se encontra em `localhost:3002`.

|Requisição|Endpoint|Parâmetro:Tipo|Descrição|
|:--------:|:------:|:------------:|:-------:|
|GET|/|-|Retorna todas as endpoints do microserviço.|
|GET|/climate|climate: String,<br> sports: String,<br> allSports: String,<br> place: String|Redireciona as requisições de clima para o microsserviço de clima.|
|GET|/local|local: String,<br> listLocales: String,<br> address: String|Redireciona as requisições de local para o microsserviço de local.|
|POST|/notification|createNotification: String,<br> telegramId: String,<br> sport: String,<br> days: Integer Array,<br> hour: Integer,<br> locals: String Array,<br> minutes: Integer,<br> hoursBefore: Integer,<br> minutesBefore: Integer |Redireciona as requisições de notificação para o microsserviço de notificação.|
