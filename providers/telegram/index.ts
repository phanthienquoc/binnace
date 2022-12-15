const TelegramBot = require('node-telegram-bot-api');
const TOKEN = '1290547542:AAGo2y1rFjAf3EqGpGeYvx5Zm4F73rlBDgA';
const USER_ID = 603532799;

class TelegramProvider {
  bot: any;
  constructor() {
    if (this.bot) return this.bot;
    this.bot = new TelegramBot(TOKEN, { polling: true });
  }

  sendMessage(chatId, message) {
    this.bot.sendMessage(chatId, message);
  }
}

export default TelegramProvider;
