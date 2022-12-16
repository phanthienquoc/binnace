import { IUser } from './model';

class UserManagement {
  users = <IUser[]>[];
  constructor() {}

  create(user: IUser) {
    this.users.push(user);
  }

  getList() {
    return this.users.map((item: any) => {
      delete item.instance;
      return item;
    });
  }
}

export default new UserManagement();
