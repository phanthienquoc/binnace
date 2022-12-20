import { Express } from 'express';

import tetRoute from '../services/tet/route';
import homeRoute from '../services/home/route';
import userRoute from '../services/user/route';
import cronJobsRoute from '../services/cronjob/route';
import notFoundRoute from '../services/notfound/route';

const registerRoutes = [homeRoute, userRoute, cronJobsRoute, tetRoute];


const appRoutes = [...registerRoutes, notFoundRoute];
export default (app: Express) => appRoutes.map((route) => route(app));
