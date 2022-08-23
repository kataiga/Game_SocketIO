FROM node:16.15.1-bullseye
    

RUN apt-get update -qq && \
apt-get install -y build-essential libpq-dev postgresql-client && \
apt-get clean autoclean && \
apt-get autoremove -y

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

CMD [ "node", "appWebRTC.js" ], [ "node", "peerApp.js" ]
