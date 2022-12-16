import { Express, Request, Response } from 'express';
import user from './index';

const userRoute = (app: Express) => {
  app
    .route('/users')
    .get((req: Request, res: Response) => {
      res.send(user.getList());
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

export default userRoute;
