import { Express, Request, Response } from 'express';
import { getDistance } from '../../services/tet/utils';

const apiRoute = (app: Express) => {
  app.route('/tet').get((req: Request, res: Response) => {
    res.send(`Còn ${getDistance()} là tết nha!!!`);
  });

  app.route('/ducfake').get((req: Request, res: Response) => {
    res.send(`Còn ${getDistance('01/14/2023')} là ILT no more nha!!!`);
  });
};

export const tetTelegramRoute = (telegram: any = null) => {
  if (telegram) {
    telegram.onCommand(/\/tet/, (msg: any) => {
      telegram.sendMessage(msg.chat.id, `Còn ${getDistance()} là tết nha!!!`);
    });
    telegram.onCommand(/\/ducfake/, (msg: any) => {
      telegram.sendMessage(
        msg.chat.id,
        `Còn ${getDistance('01/14/2023')} là ILT no more nha!!!`
      );
    });
  }
};

export default {
  APIRoute: apiRoute,
  TELEGRAMRoute: tetTelegramRoute,
};
