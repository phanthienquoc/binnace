import { IStock } from './model';
import { createTicket } from '../../providers/firebase/stock';
import { Express, Request, Response } from 'express';

// [GIL][15][6 / 1 / 2023][19.8];

class StockManagement {
  Stocks = <IStock[]>[];
  constructor() {}

  create(Stock: IStock) {
    this.Stocks.push(Stock);
  }

  getList() {
    return this.Stocks.map((item: any) => {
      delete item.instance;
      return item;
    });
  }

  async createStock(req: Request, res: Response) {
    const stockOrder = req.body;
    console.log('createStock', stockOrder);
    res.send('Update a cronjobs');
  }

  async addStockOrder(stockOrder: any) {
    return await console.log('createStock', stockOrder);
  }
}

export default StockManagement;
