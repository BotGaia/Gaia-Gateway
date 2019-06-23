# Gaia-Gateway

[![pipeline status](https://gitlab.com/botgaia/Gaia-Gateway/badges/master/pipeline.svg)](https://gitlab.com/botgaia/Gaia-Gateway/commits/master)
[![coverage report](https://gitlab.com/botgaia/Gaia-Gateway/badges/master/coverage.svg)](https://gitlab.com/botgaia/Gaia-Gateway/commits/master)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

---

## Objetivo

Esse serviço é responsável em fazer o tratamento das requisições entre a [Gaia](https://github.com/BotGaia/Gaia) e os microsserviços, [Esporte](https://github.com/BotGaia/Gaia-Esporte) e [Ciclone](https://github.com/BotGaia/Gaia-Ciclone).

Você pode encontrar o serviço nos sequintes links: [homologação](https://gateway.hml.botgaia.ga/) e [produção](https://gateway.botgaia.ga/).

## Como contribuir

Se tiver interesse em como contribuir para o projeto, olhe mais sobre o projeto em nossa [wiki](https://github.com/fga-eps-mds/2019.1-Gaia) e dê uma lida também no nosso guia de [contribuição](https://github.com/BotGaia/Gaia-Gateway/blob/dev/CONTRIBUTING.md).

## Como usar

### Como rodar

O nosso projeto utiliza o Docker e o Docker Compose como ferramentas de desenvolvimento. Para instalar eles, siga o tutorial no site oficial do [Docker](https://www.docker.com/).

Após instalar o docker rode o projeto como desenvolvimento da seguinte maneira:

``` $ sudo docker build -t gaiagateway . ```

Após o build, rode esse outro comando, ele será disponibilizado em `localhost:3002`::

```$ sudo docker run --env-file .env --rm -it -p 3002:3002 -v $PWD:/app -v /app/node_modules gaiagateway```

Para rodar os testes, utilize:

``` $ sudo docker run --env-file .env --rm -v $PWD:/app -v /app/node_modules gaiagateway npm run test ```

Para rodar a folha de estilo, utilize este comando:

``` $ sudo docker run --env-file .env --rm -v $PWD:/app -v /app/node_modules gaiagateway npm run lint ```

### Endpoints

Para ver quais os endpoints desse serviço, basta acessar a rota principal `/`.
