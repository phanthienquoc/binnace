import express, { Express } from 'express';

import dotenv from 'dotenv';
import { API_Routes, TELEGRAM_Routes } from './routes';
import bodyParser from 'body-parser';
// import { adminSystemLogin } from './providers/firebase/index';
import telegram from './providers/telegram';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
// app.use(cors({ origin: ['http://localhost:8080', 'http://127.0.0.1:3000'] }));

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

// adminSystemLogin();

app.use(express.static('public'));
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
