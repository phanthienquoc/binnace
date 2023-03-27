import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import telegram from './providers/telegram';
import { Express } from 'express';
import { API_Routes, TELEGRAM_Routes } from './routes';

import connect from './providers/mongodb';
dotenv.config();

console.log(process.env.ENV);
const app: Express = express();
const port = process.env.SOCKET_PORT;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  ); // If needed
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  ); // If needed
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // If needed

  next();
});

API_Routes(app);
TELEGRAM_Routes(telegram);

// app.use(express.static('public'));
app.listen(port, () => {
  connect();
  console.log(`⚡️[server][Binance]⚡️`);
});

export default app;
