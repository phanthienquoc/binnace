import { Express, Request, Response } from 'express';

const homeRoute = (app: Express) => {
  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });
};

export default homeRoute;
