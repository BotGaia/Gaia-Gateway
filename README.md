# Gaia-Gateway

## Objetivo
Esse serviço é responsável por fazer toda a ponte da Gaia, um chatbot, com os microsserviços.

## Como usar

### Como rodar
Primeiro tem que instalar o docker e o docker compose, em seguida rode o projeto como desenvolvimento da seguinte maneira:

``` $ sudo docker build -t gaiagateway . ```

Após o build, rode esse outro comando:

```$ docker run --rm -it -p 3002:3002 -v $PWD:/app -v /app/node_modules gaiagateway```

Para rodar a folha de estilo, utilize este comando:

``` $ docker run --rm -v $PWD:/app -v /app/node_modules gaiagateway /bin/sh -c "cd /app; npm run lint" ```

Para rodar os testes, utilize:

``` $ docker run --rm -v $PWD:/app -v /app/node_modules gaiagateway /bin/sh -c "cd /app; npm run test" ```

### Endpoints
<table>
	<tr>
		<td>GET</td>
		<td>localhost:3001/local?address={VALOR}</td>
		<td>address</td>
		<td>String</td>
		<td>Recebe as coordenadas do local informados</td>
	</tr>
</table>
