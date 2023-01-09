import { Express, Request, Response } from 'express';

const userRoute = (app: Express) => {
  app
    .route('/user')
    .get(async (req: Request, res: Response) => res.send([]))
    .post(async (req: Request, res: Response) => res.send([]))
    .put(async (req: Request, res: Response) => res.send('Update'))
    .delete(async (req: Request, res: Response) => res.send('Detele'));
};

export const userTelegramRoute = (telegram: any = null) => {
  console.log(telegram);
  if (telegram) {
    telegram.onCommand(/\/register/, (msg: any) => {
      telegram.sendMessage(msg.from.id, `@${msg.from.username} registered in!`);
      // let newSystemUser: any = await getUser({ user_id: msg.chat.id });
      // if (!newSystemUser) {
      //   await createUser({
      //     ...msg.from,
      //     user_id: msg.from.id,
      //     group_id: msg.chat.id,
      //     metaData: JSON.stringify(msg),
      //   });
      // }
    });
    telegram.onCommand(/\/login/, async (msg: any) => {
      telegram.sendMessage(msg.from.id, `@${msg.from.username} logged in!`);

      // try {
      //   let newSystemUser = await getUser({ user_id: msg.chat.id });
      //   if (newSystemUser) {
      //     let user: any = await signInAnonymously(auth);
      //     console.log(msg);
      //     telegram.sendMessage(msg.from.id, `@${msg.from.username} logged in!`);
      //   } else {
      //     telegram.sendMessage(msg.from.id, `@${msg.from.username} logged in!`);
      //   }
      // } catch (error) {
      //   let newErrror: any = error;
      //   const errorCode = newErrror.code;
      //   const errorMessage = newErrror.message;
      //   telegram.sendMessage(
      //     msg.from.id,
      //     `@${msg.from.username} login fail! ${errorMessage}`
      //   );
      // }
    });
  }
};

export default {
  APIRoute: userRoute,
  TELEGRAMRoute: userTelegramRoute,
};
