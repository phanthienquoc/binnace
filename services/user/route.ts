import { Express, Request, Response } from 'express';
import { getUser, createUser } from '../../providers/firebase/users';
import UserRepository from '../../repository/firebaseRepository/user';
const userRoute = (app: Express) => {
  let userManagement = new UserRepository();
  app
    .route('/user')
    .get(async (req: Request, res: Response) => {
      let users = await userManagement.getItems();
      res.send(users);
    })
    .post(async (req: Request, res: Response) => res.send([]))
    .put(async (req: Request, res: Response) => res.send('Update'))
    .delete(async (req: Request, res: Response) => res.send('Detele'));
};

export const userTelegramRoute = (telegram: any = null) => {
  let userManagement = new UserRepository();
  if (telegram) {
    telegram.onCommand(/\/register/, async (msg: any) => {
      console.log(JSON.stringify(msg));
      telegram.sendMessage(msg.chat.id, `@${msg.from.username} registered in!`);
      userManagement.create({
        ...msg.from,
        user_id: msg.from.id,
        group_id: msg.chat.id,
        metaData: JSON.stringify(msg),
        stock: [],
      });

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
      telegram.sendMessage(msg.chat.id, `@${msg.from.username} logged in!`);
    });
    telegram.onCommand(/\/delete/, async (msg: any) => {
      userManagement.delete(msg.from.id);
    });
  }
};

export default {
  APIRoute: userRoute,
  TELEGRAMRoute: userTelegramRoute,
};
