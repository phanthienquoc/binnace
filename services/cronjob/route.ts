import cronjob from './index';
import telegram from '../../providers/telegram';

import { TELEGRAM } from './../../constants/constants';
import { Express, Request, Response } from 'express';
import {
  getSchedueTemplate,
  getRegisterSuccessTemplate,
  createCronJobTime,
} from './utils';

const cronJobsRoute = (app: Express) => {
  app
    .route('/cronjobs')
    .get((req: Request, res: Response) => {
      res.send(cronjob.getList());
    })
    .post((req: Request, res: Response) => {
      try {
        let newcronjob = {
          ...req.body,
          name: req.body.label,
          cronTime: createCronJobTime(req.body.from),
          action: () => {
            telegram.sendMessage(
              TELEGRAM.USER_ID,
              getSchedueTemplate(newcronjob)
            );
          },
        };

        cronjob.create(newcronjob);
        res.send(cronjob.getList());
        telegram.sendMessage(
          TELEGRAM.USER_ID,
          getRegisterSuccessTemplate(
            newcronjob.label,
            'register',
            createCronJobTime(newcronjob.from)
          )
        );
      } catch (error) {
        telegram.sendMessage(TELEGRAM.USER_ID, `init cronjob fail ${error}`);
      }
    })
    .put((req: Request, res: Response) => {
      res.send(cronjob.getList());
    })
    .delete((req: Request, res: Response) => {
      res.send(cronjob.getList());
    });
};

const cronJobsTelegram = (telegram: any) => {
  telegram.onCommand(/\/cronjob/, (msg: any) => {
    telegram.sendMessage(msg.chat.id, JSON.stringify(cronjob.getList()));
  });
};

export default {
  APIRoute: cronJobsRoute,
  TELEGRAMRoute: cronJobsTelegram,
};
