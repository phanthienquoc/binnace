import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config();
const bot_token: any = process.env.BOT_TOKEN;
const group_id_noti: any = process.env.ADMIN_GROUP_ID;

console.log('TelegramProvider', bot_token);
class TelegramProvider {
  bot: any;
  constructor(bot_token: any) {
    try {
      if (this.bot) return this.bot;
      this.bot = new TelegramBot(bot_token, {
        polling: true,
      });
      this.bot.on('channel_post', (msg: any) => {
        // console.log(msg);
        this.bot.sendMessage(603532799, JSON.stringify(msg));
      });
      this.bot.on('message', (msg: any) => {
        // console.log(msg);
        this.bot.sendMessage(group_id_noti, JSON.stringify(msg));
      });
      this.bot.onText(/\/echo (.+)/, (msg: any, match: any) => {
        const chatId = msg.chat.id;
        const resp = match[1];
        this.bot.sendMessage(chatId, resp);
      });

      // this.bot.sendMessage(group_id_noti, `⚡️[${env}] ⚡️`);

      this.bot.onText(/\/key (.+)/, (msg: any, match: any) => {
        const chatId = msg.chat.id;
        const resp = match[1];
        this.bot.sendMessage(chatId, resp);
      });
    } catch (error) {
      console.log('Re-init telegram');
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

const telegramBot = new TelegramProvider(bot_token);

export default telegramBot;
