import { Express, Request, Response } from 'express';

const homeRoute = (app: Express) => {
  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });
};

const homeTelegramRoute = (telegram: any = null) => {
  if (telegram) {
    telegram.onCommand(/\/home/, (msg: any) => {
      telegram.sendMessage(msg.from.id, `@${msg.from.username} home!`);
    });
  }
};

export default {
  APIRoute: homeRoute,
  TELEGRAMRoute: homeTelegramRoute,
};
