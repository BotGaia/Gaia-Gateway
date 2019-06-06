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

```$ sudo docker run --env-file .env --rm -it -p 3002:3002 -v $PWD:/app -v /app/node_modules gaiagateway```

Para rodar os testes, utilize:

``` $ sudo docker run --env-file .env --rm -v $PWD:/app -v /app/node_modules gaiagateway npm run test ```

Para rodar a folha de estilo, utilize este comando:

``` $ sudo docker run --env-file .env --rm -v $PWD:/app -v /app/node_modules gaiagateway npm run lint ```

### Endpoints

Aqui se encontra todos os endpoints desse serviço. Todos os endpoints se encontra em `localhost:3002`.

|Requisição|Endpoint|Parâmetro:Tipo|Descrição|
|:--------:|:------:|:------------:|:-------:|
|GET|/|address: String,<br> place: String,<br> intent: String,<br> id: String,<br>number: Number|Redireciona requisições GET para Gaia-Esporte de acordo com os parâmetros|
|POST|/|telegramId: String,<br> sport: String,<br> days: Array\<String>,<br> hour: Integer,<br> locals: Array\<String>,<br> minutes: Integer,<br> hoursBefore: Integer,<br> minutesBefore: Integer,<br> class: String,<br> date: String|Redireciona requisições POST para as rotas createNotification em Gaia-Esporte ou notify de acordo com os parâmetros|
