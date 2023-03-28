import Binance from '../binance';
import UserSchema from '../../model/User';
class User {
  constructor() {}

  public static async initialize(): Promise<User> {
    let instance = new User();
    const users: any = await UserSchema.find();
    let createdUsers = users.map(async (user: any) => {
      // console.log('user', user);
      return {
        user_id: user.user_id,
        binance: await Binance.initialize(user.user_id),
      };
    });

    instance = await Promise.all(createdUsers);
    // console.log('createdUsers', instance);

    return instance;
  }
}

export default User;
