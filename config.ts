import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import connect from './src/providers/mongodb';
import telegram from './src/providers/telegram';
import User from './src/model/User';

import { TELEGRAM_Routes } from './routes';

TELEGRAM_Routes(telegram);
dotenv.config();
const port = process.env.SOCKET_PORT;

const configApp = (app: any) => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  app.use((req: any, res: any, next: any) => {
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
  app.use(express.static('public'));
  app.listen(port, async () => {
    await connect();
    const users = await User.find();
    // const listUser: Array<any> = users.map((user) => {
    //   console.log(JSON.stringify(user.id));
    //   const binanceItem: any = Binance.create(user.id);
    //   return {
    //     ...user,
    //     binance: binanceItem?.binance,
    //   };
    // });
    // console.log(listUser);

    console.log(`⚡️[server][Binance]⚡️`);
  });
};

export default configApp;
