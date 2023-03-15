import { Express, Request, Response } from 'express';
import Binance from 'node-binance-api';
import { sumBalanceSpot, sumFutureBalance, filterData } from './utils';

//initialize the WebSocket server instance
const binance = new Binance().options({
  APIKEY: 'RdrERnq3nMBR27Q0lZOa4HO00PPqrsb3ArQEQxCOa69kQEIdoIpmcECyvXP1yjdN',
  APISECRET: 'NchD3BUBQnnPpEBA8IPTopKPEcoRRzsEd1xjXK0iFeHEZDSKV9gDUJQBkMXF7xxx',
  useServerTime: true,
  family: 4,
});

const orderRoute = (app: Express) => {
  app
    .route('/binance')
    .get(async (req: Request, res: Response) => {
      res.send('');
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
    telegram.onCommand(/\/binance/, async (msg: any) => {
      let tickers = await binance.prices();
      let futureBalance = await binance.futuresBalance();

      binance.balance((error: any, balances: any) => {
        if (error) return console.error(error);
        let balanceItems = Object.entries(balances).filter(
          ([key, { available, onOrder }]: any) => {
            return parseFloat(available) > 0;
          }
        );

        let pricess = filterData(balanceItems, tickers);
        futureBalance = sumFutureBalance(futureBalance);

        telegram.sendMessage(
          msg.from.id,
          `
          spot:\t  ${sumBalanceSpot(pricess)} USDT!\nfuture:\t ${parseFloat(
            futureBalance
          ).toFixed(8)} USDT
          `
        );
      });
    });
  }
};

export default {
  APIRoute: orderRoute,
  TELEGRAMRoute: telegramRoute,
};
