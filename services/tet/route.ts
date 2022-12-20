import telegram from '../../providers/telegram';

import { Express, Request, Response } from 'express';
import { getDistance } from '../../services/tet/utils';

const tetRoute = (app: Express) => {
  app.route('/tet').get((req: Request, res: Response) => {
    res.send(`Còn ${getDistance()} là tết nha!!!`);
  });

  telegram.onCommand(/\/tet/, (msg: any) => {
    telegram.sendMessage(msg.chat.id, `Còn ${getDistance()} là tết nha!!!`);
  });
};

export default tetRoute;
