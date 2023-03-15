import { Express } from 'express';

import tet from '../services/tet/route';
import home from '../services/home/route';
import user from '../services/user/route';
import cron from '../services/cronjob/route';
import stock from '../services/stock/route';
import order from '../services/order/route';
import binance from '../services/binance/route';
import notFound from '../services/notfound/route';

// const registerRoutes = [tet, home, user, cron, stock, order, binance];
const registerRoutes = [binance];
const appRoutes = [...registerRoutes, notFound];

export const API_Routes = (app: Express) => {
  return appRoutes.map((route: any) => route.APIRoute(app));
};

export const TELEGRAM_Routes = (telegram: any) => {
  appRoutes.map((route: any) => {
    console.log(route.TELEGRAMRoute);
    route.TELEGRAMRoute(telegram);
  });
};
