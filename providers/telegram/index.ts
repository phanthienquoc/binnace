import TelegramBot from 'node-telegram-bot-api';
import { TELEGRAM } from '../../constants/constants';

class TelegramProvider {
  bot: any;

  constructor() {
    try {
      if (this.bot) return this.bot;
      this.bot = new TelegramBot(TELEGRAM.BOT_TELEGRAM_TOKEN, {
        polling: true,
      });
      console.log(this.bot.sendMessage(TELEGRAM.USER_ID, `Lucifer's online!`));
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
}

export default new TelegramProvider();
