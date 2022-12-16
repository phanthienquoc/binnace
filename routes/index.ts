import { Express } from 'express';

import homeRoute from '../services/home/route';
import userRoute from '../services/user/route';
import cronJobsRoute from '../services/cronjob/route';
import notFoundRoute from '../services/notfound/route';

const registerRoutes = [homeRoute, userRoute, cronJobsRoute, notFoundRoute];

export default (app: Express) => registerRoutes.map((route) => route(app));
