import { Express, Request, Response } from 'express';
import { getDistance } from '../../services/tet/utils';

const apiRoute = (app: Express) => {
  app.route('/tet').get((req: Request, res: Response) => {
    res.send(`Còn ${getDistance()} là tết nha!!!`);
  });
};

export const tetTelegramRoute = (telegram: any = null) => {
  if (telegram) {
    telegram.onCommand(/\/tet/, (msg: any) => {
      telegram.sendMessage(msg.chat.id, `Còn ${getDistance()} là tết nha!!!`);
    });
  }
};

export default {
  APIRoute: apiRoute,
  TELEGRAMRoute: tetTelegramRoute,
};
