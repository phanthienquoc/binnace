import { Express } from 'express';

import binance from '../services/binance/route';
import notFound from '../services/notfound/route';

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
