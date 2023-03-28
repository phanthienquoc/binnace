import dotenv from 'dotenv';
import User from '../../model/User';
import Key from '../../model/APIKey';
import App from '../../../config';
import TelegramBot from 'node-telegram-bot-api';
import { encodeText } from './../../utils/index';
import { sumBalanceSpot, sumFutureBalance, filterData } from '../../utils';

dotenv.config();
const bot_token: any = process.env.BOT_TOKEN;
const group_id_noti: any = process.env.ADMIN_GROUP_ID;
console.log('TelegramProvider', bot_token);

interface TextMatchInterface {
  regexp: RegExp;
  action: any;
}
class Telegram {
  bot: any;
  actions: TextMatchInterface[] = [];

  constructor() {
    try {
      if (this.bot) return this.bot;
      this.bot = new TelegramBot(bot_token, {
        polling: true,
      });
      this.bot.on('channel_post', (msg: any) => {
        this.bot.sendMessage(msg.from.id, JSON.stringify(msg));
      });

      this.bot.onText(/\/register/, async (msg: any, match: any) => {
        const user: any = await User.findOne({ user_id: msg.from.id });
        if (!user) {
          const createdUser = await User.create({
            user_id: msg.from.id,
            first_name: msg.from.first_name,
            last_name: msg.from.last_name,
            email: msg.from.email,
            role: 'admin',
            password: 'admin',
          });

          await Key.create({ user_id: msg.from.id });
          this.bot.sendMessage(msg.from.id, 'created user!');
        } else {
          this.bot.sendMessage(msg.from.id, 'exist user');
        }
      });
      this.bot.onText(
        /^\/set\s+(\w+)\s+(\w+)$/,
        async (msg: any, match: any) => {
          const tokenKey = match[2];
          switch (match[1]) {
            case 'key': {
              await Key.findOneAndUpdate(
                { user_id: msg.from.id },
                { $set: { key: encodeText(tokenKey) } }
              );
              break;
            }
            case 'secret': {
              const tokenSecret = match[2];
              await Key.findOneAndUpdate(
                { user_id: msg.from.id },
                { $set: { secret: encodeText(tokenSecret) } }
              );
            }
          }
        }
      );
      this.bot.onText(/\/balance/, async (msg: any, match: any) => {
        const item = (await App).getUserById(msg.from.id.toString());
        let balances = await item[0].binance.balance();
        let ticker = await item[0].binance.prices();

        const balance = await item[0].binance;
        console.log('accountInfo balance', balance);

        let blance = filterData(Object.entries(balances), ticker);
        this.bot.sendMessage(
          msg.from.id,
          `
          Balance Spot: ${sumBalanceSpot(
            blance
          )}\nBalance Futu: ${sumFutureBalance(blance)}\n
        `
        );
      });
      this.bot.on('polling_error', console.log);
    } catch (error) {
      // console.log('Re-init telegram');
      this.reset();
    }
  }

  async reset() {
    await this.bot.stopPolling();
    await this.bot.startPolling();
  }

  sendMessage(chatId: any, message: string) {
    this.bot.sendMessage(chatId, message);
  }

  onMessage(text: string, callBack: any) {
    this.bot.onText(text, callBack);
  }

  onCommand(regexp: RegExp, callback: any) {
    this.bot.onText(regexp, callback);
  }

  sendChannel(chatId: any, message: any) {
    this.bot.sendMessage(chatId, message, {
      parse_mode: 'HTML',
    });
  }
}

export default Telegram;
