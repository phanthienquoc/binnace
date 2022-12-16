import { Express, Request, Response } from 'express';
import cronjob from './index';

const cronJobsRoute = (app: Express) => {
  app
    .route('/cronjobs')
    .get((req: Request, res: Response) => {
      res.send(cronjob.getList());
    })
    .post((req: Request, res: Response) => {
      res.send('Create a cronjobs');
    })
    .put((req: Request, res: Response) => {
      res.send('Update a cronjobs');
    })
    .delete((req: Request, res: Response) => {
      res.send('Detele a cronjobs');
    });
};

export default cronJobsRoute;
