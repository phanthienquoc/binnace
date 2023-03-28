FROM node:14.17.3 AS build

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env.production ./

RUN npm install

ARG ENV
ARG SOCKET_PORT

ARG ADMIN_GROUP_ID
ARG BOT_TOKEN

ARG MONGO_DB_ID
ARG MONGO_DB_PASSWORD

RUN sed -i "s|ENV|${ENV}|" .env.production
RUN sed -i "s/SOCKET_PORT/${SOCKET_PORT}/" .env.production
RUN sed -i "s|ADMIN_GROUP_ID|${ADMIN_GROUP_ID}|" .env.production
RUN sed -i "s|BOT_TOKEN|${BOT_TOKEN}|" .env.production
RUN sed -i "s|MONGO_DB_ID|${MONGO_DB_ID}|" .env.production
RUN sed -i "s|MONGO_DB_PASSWORD|${MONGO_DB_PASSWORD}|" .env.production

COPY . .

EXPOSE 9999
