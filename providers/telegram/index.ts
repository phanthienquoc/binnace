import TelegramBot from 'node-telegram-bot-api';
import { TELEGRAM } from '../../constants/constants';

class TelegramProvider {
  bot: any;

  constructor() {
    console.log('init telegram bot');
    if (this.bot) return this.bot;
    this.bot = new TelegramBot(TELEGRAM.BOT_TELEGRAM_TOKEN);
    if (this.bot) {
      this.bot.stopPolling();
      this.bot.startPolling();
    }
    // this.bot.on('message', (msg: any) => {
    //   const chatId = msg.chat.id;
    //   console.log(msg);
    //   // this.bot.sendMessage(USER_ID, 'ahihi');
    // });
  }

  reset() {
    this.bot.stopPolling();
    this.bot.startPolling();
  }

  sendMessage(chatId: any, message: string) {
    this.bot.sendMessage(chatId, message);
  }

  onMessage(text: string, callBack: any) {
    this.bot.onText(text, callBack);
  }

  getBot() {
    return this.bot;
  }

  onCommand(regexp: RegExp, callback: any) {
    this.bot.onText(regexp, callback);
  }
}

export default new TelegramProvider();
