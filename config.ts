import express from 'express';
import Binance from './src/services/binance';
import Telegram from './src/providers/telegram';
import Database from './src/services/database';
import User from './src/services/user';
class BinanceCore {
  private app: any;
  telegram: any;
  users: any;
  binances: any[] = [];
  database: any;

  constructor() {
    if (this.app) {
      return this.app;
    }
    this.app = express();
  }

  public static async initialize(): Promise<BinanceCore> {
    const instance = new BinanceCore();

    try {
      /**
       * Load List User
       */
      instance.telegram = new Telegram();
      instance.database = await Database.initialize();
      instance.users = await User.initialize();
      // console.log(instance.users);
      /**
       * Load key by user
       */
    } catch (error) {
      console.error('Initial app fail', error);
      instance.telegram.sendMessage(
        '-1001902936364',
        `⚡️[Server][Binance][Fail]⚡️`
      );
    }
    return instance;
  }

  getUsers() {
    return this.users;
  }
  getUserById(user_id: string) {
    return this.users.filter((user: any) => user.user_id === user_id);
  }
}

const initializeApp = async () => await BinanceCore.initialize();

export default initializeApp();

// Perform config action
// instance.app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
// instance.app.use(bodyParser.json());
// instance.app.use((req: any, res: any, next: any) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//   ); // If needed
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With,content-type'
//   ); // If needed
//   res.setHeader('Access-Control-Allow-Credentials', 'true'); // If needed
//   next();
// });
// instance.app.use(express.static('public'));
// Perform some async initialization tasks here
// instance.app.listen(port, async () => {
// TELEGRAM_Routes(telegram);
// instance.telegram.sendMessage(
//   '-1001902936364',
//   `⚡️[Server][Binance][Success]⚡️`
// );
//// console.log(`⚡️[Server][Binance][Success]⚡️`);
// });
