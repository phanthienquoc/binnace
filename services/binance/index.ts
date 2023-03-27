import { IStock } from './model';
import { Request, Response } from 'express';

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
