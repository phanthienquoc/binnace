import { getDataFromTextByRegex } from './utils';
import { Express, Request, Response } from 'express';
import OrderRepository from '../../repository/firebaseRepository/order';

const orderRoute = (app: Express) => {
  let orderManagement = new OrderRepository();

  app
    .route('/order')
    .get(async (req: Request, res: Response) => {
      let orders = await orderManagement.getItems();
      res.send(orders);
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
    let stockManagement = new OrderRepository();
    telegram.onCommand(/\/order/, async (msg: any) => {
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
  APIRoute: orderRoute,
  TELEGRAMRoute: telegramRoute,
};
