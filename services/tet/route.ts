import telegram from '../../providers/telegram';

import { Express, Request, Response } from 'express';
import { getDistance } from '../../services/tet/utils';

const tetRoute = (app: Express) => {
  app.route('/tet').get((req: Request, res: Response) => {
    res.send(`Còn ${getDistance()} là tết nha!!!`);
  });

  app.route('/ducfake').get((req: Request, res: Response) => {
    res.send(`Còn ${getDistance('01/14/2023')} là ILT no more nha!!!`);
  });

  telegram.onCommand(/\/tet/, (msg: any) => {
    telegram.sendMessage(msg.chat.id, `Còn ${getDistance()} là tết nha!!!`);
  });

  telegram.onCommand(/\/ducfake/, (msg: any) => {
    telegram.sendMessage(
      msg.chat.id,
      `Còn ${getDistance('01/14/2023')} là ILT no more nha!!!`
    );
  });
};

export default tetRoute;
