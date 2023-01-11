import { getDataFromTextByRegex } from './utils';
import { Express, Request, Response } from 'express';
import StockRepository from '../../repository/firebaseRepository/stock';

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

const telegramRoute = (telegram: any = null) => {
  if (telegram) {
    let stockManagement = new StockRepository();
    telegram.onCommand(/\/stock/, async (msg: any) => {
      let newStockOrder = {
        init_user_id: msg.chat.id,
        user_id: msg.from.id,
        ...getDataFromTextByRegex(msg.text),
      };

      await stockManagement.create(newStockOrder);
    });
  }
};

export default {
  APIRoute: stockRoute,
  TELEGRAMRoute: telegramRoute,
};
