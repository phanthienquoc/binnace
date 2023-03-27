import mongoose from 'mongoose';
import KeyAPI from '../key';

import BinanceNode from 'node-binance-api';
import { Express, Request, Response } from 'express';
import { sumBalanceSpot, sumFutureBalance, filterData } from './utils';
import Key from '../key';

class Binance {
  userId: any;
  binance: any;
  constructor(userId: string) {
    this.userId = userId;
  }
  static async create(userId: string): Promise<Binance> {
    const instance = new Binance(userId);
    const userKey = await Key.find({ userId: userId });
    console.log(userKey);
    const apiKey = '';
    const apiSecret = '';

    instance.binance = new BinanceNode().options({
      APIKEY: apiKey,
      APISECRET: apiSecret,
      useServerTime: true,
      family: 4,
    });

    return instance;
  }
}

export default Binance;
