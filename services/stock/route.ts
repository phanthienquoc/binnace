import { Express, Request, Response } from 'express';
import StockRepository from '../../repository/firebaseRepository/stock';
import UserRepository from '../../repository/firebaseRepository/user';

const stockRoute = (app: Express) => {
  let stockManagement: any = new StockRepository();

  app
    .route('/stock')
    .get(async (req: Request, res: Response) => {
      let stocks = await stockManagement.getItems();
      res.send(stocks);
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
    let userManagement: any = new UserRepository();

    telegram.onCommand(/\/stock/, async (msg: any) => {
      console.log('onCommand', msg);

      const regex = {
        getItems: {
          regex: /\/stock list/,
          action: (currentStock: [any], item: any) => {
            telegram.sendMessage(msg.from.id, JSON.stringify(currentStock));
            return currentStock;
          },
        },
        create: {
          regex: /\/stock\sadd\s\[(\w+)\]/,
          action: (currentStock: [any], item: any) => {
            if (currentStock.indexOf(item) === -1) {
              currentStock.push(item);
            }

            return currentStock;
          },
        },
        delete: {
          regex: /\/stock\sdelete\s\[(\w+)\]/,
          action: (currentStock: [any], item: any) => {
            return currentStock.filter((stock: any) => stock !== item);
          },
        },
      };

      let user = await userManagement.get(msg.chat.id);

      Object.entries(regex).map(async ([key, regexItem]) => {
        if (regexItem.regex.exec(msg.text) !== null) {
          let matchItem: any = regexItem.regex.exec(msg.text);
          let userStock = user?.stock || [];
          let newStockData = regexItem.action(userStock, matchItem[1]);

          await userManagement.update({
            user_id: msg.from.id,
            stock: newStockData,
          });
        }
      });
    });
  }
};

export default {
  APIRoute: stockRoute,
  TELEGRAMRoute: telegramRoute,
};
