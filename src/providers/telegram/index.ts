import dotenv from 'dotenv';
import User from '../../model/User';
import Key from '../../model/APIKey';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config();
const bot_token: any = process.env.BOT_TOKEN;
const group_id_noti: any = process.env.ADMIN_GROUP_ID;
console.log('TelegramProvider', bot_token);

interface TextMatchInterface {
  regexp: RegExp;
  action: any;
}
class TelegramProvider {
  bot: any;
  actions: TextMatchInterface[] = [];

  constructor(bot_token: any) {
    try {
      if (this.bot) return this.bot;
      this.bot = new TelegramBot(bot_token, {
        polling: true,
      });
      this.bot.on('channel_post', (msg: any) => {
        this.bot.sendMessage(msg.from.id, JSON.stringify(msg));
      });

      this.bot.onText(/\/register/, async (msg: any, match: any) => {
        const user = await User.findOne({ user_id: msg.from.id });
        if (!user) {
          const createdUser = await User.create({
            user_id: msg.from.id,
            first_name: msg.from.first_name,
            last_name: msg.from.last_name,
            email: msg.from.email,
            role: 'admin',
            password: 'admin',
          });
          console.log(createdUser);

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
                { $set: { key: tokenKey } }
              );
              break;
            }
            case 'secret': {
              const tokenSecret = match[2];
              await Key.findOneAndUpdate(
                { user_id: msg.from.id },
                { $set: { secret: tokenSecret } }
              );
            }
          }
        }
      );
      this.bot.on('polling_error', console.log);
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

const telegram = new TelegramProvider(bot_token);

export default telegram;
