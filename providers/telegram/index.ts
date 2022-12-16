import TelegramBot from 'node-telegram-bot-api';
const TOKEN = '1290547542:AAGo2y1rFjAf3EqGpGeYvx5Zm4F73rlBDgA';
const USER_ID = 603532799;

class TelegramProvider {
  bot: any;
  constructor() {
    if (this.bot) return this.bot;
    this.bot = new TelegramBot(TOKEN, { polling: true });
  }

  reset() {
    this.bot.stopPolling();
    this.bot.startPolling();
  }

  sendMessage(chatId:any, message:string) {
    this.bot.sendMessage(chatId, message);
  }
}

const telegram = new TelegramProvider()

export default telegram;
