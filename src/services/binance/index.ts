import Key from '../../model/APIKey';
import BinanceNode from 'node-binance-api';
import { decodeText } from '../../utils';

class Binance {
  constructor() {}
  static async initialize(user_id: string): Promise<Binance> {
    let instance = new Binance();

    const userKey = await Key.findOne({ user_id: user_id });
    const apiKey: any = userKey?.key;
    const apiSecret: any = userKey?.secret;

    instance = await new BinanceNode().options({
      APIKEY: decodeText(apiKey),
      APISECRET: decodeText(apiSecret),
      useServerTime: true,
      family: 4,
    });

    return instance;
  }
}

export default Binance;
