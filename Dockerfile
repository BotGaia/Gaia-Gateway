FROM node:latest
RUN mkdir /app
ENV ENVIRONMENT=dev
WORKDIR /app
COPY package*.json /app/
RUN npm install
RUN npm i nodemon -g
COPY . /app
CMD npm run dev
EXPOSE 3002