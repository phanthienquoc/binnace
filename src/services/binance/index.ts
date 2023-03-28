import Key from '../../model/APIKey';
import BinanceNode from 'node-binance-api';
import { Express, Request, Response } from 'express';
import { sumBalanceSpot, sumFutureBalance, filterData } from './utils';

class Binance {
  constructor() {}
  static async initialize(user_id: string): Promise<Binance> {
    let instance = new Binance();

    const userKey = await Key.findOne({ user_id: user_id });

    instance = await new BinanceNode().options({
      APIKEY: userKey?.key,
      APISECRET: userKey?.secret,
      useServerTime: true,
      family: 4,
    });

    return instance;
  }
}

export default Binance;
