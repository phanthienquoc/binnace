import express, { Express } from 'express';

import dotenv from 'dotenv';
import appRoutes from './routes';
import telegram from './providers/telegram';

import cronjobs from './services/cronjob';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

cronjobs.create({
  action: () => {
    console.log('card');
  },
});

appRoutes(app);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
