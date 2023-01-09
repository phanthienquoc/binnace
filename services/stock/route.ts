import { Express, Request, Response } from 'express';

const stockRoute = (app: Express) => {
  app
    .route('/stock')
    .get((req: Request, res: Response) => {
      res.send([]);
    })
    .post(async (req: Request, res: Response) => {
      res.send('Update a cronjobs');
    })
    .put(async (req: Request, res: Response) => {
      res.send('Update a cronjobs');
    })
    .delete(async (req: Request, res: Response) => {
      res.send('Detele a cronjobs');
    });
};

const telegramRoute = (telegramBot: any = null) => {
  if (telegramBot) {
    console.log('xxxinit');
    telegramBot.onCommand(/\/stock/, (msg: any) => {
      telegramBot.sendMessage(msg.chat.id, msg.chat.message);
    });
  }
};

export default { APIRoute: stockRoute, TELEGRAMRoute: telegramRoute };
