import { Express, Request, Response } from 'express';

const notFoundRoute = (app: Express) => {
  app.use('*', (req: Request, res: Response) => {
    res.send('Not found!!!');
  });
};

export const notFoundTelegramRoute = (telegram: any = null) => {};

export default {
  APIRoute: notFoundRoute,
  TELEGRAMRoute: notFoundTelegramRoute,
};
