import IRepository from '../..';
import telegram from '../../../src/providers/telegram';

import { TELEGRAM } from './../../../constants/constants';
import { doc, addDoc, deleteDoc } from 'firebase/firestore';
import { database } from './../../../src/providers/firebase/index';
import { query, where, getDocs, collection } from 'firebase/firestore';

class OrderRepository extends IRepository {
  constructor(public iDatabase?: any, public serviceName?: string) {
    super(collection(database, 'order'), 'order');
  }

  public async get(id: string) {
    let user: any;
    const q: any = await query(this._database, where('user_id', '==', id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, ' => ', doc.data());
      user = doc.data();
    });

    return user;
  }
  public async getItems(params?: any) {
    let users: any = [];
    const q = query(this._database);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
      users = [...users, doc.data()];
    });

    return users;
  }
  public async create(item: any) {
    try {
      let user: any = await this.get(item.id);
      if (!user) {
        await addDoc(this._database, item);
        telegram.sendChannel(
          TELEGRAM.CHANNEL.SYSTEM.ID,
          `${this._serviceName}\n ${this.getUserInfo(item)}`
        );
        return user;
      } else {
        throw new Error(`⚡️\t@${item.username} has registered!!!!`);
      }
    } catch (error) {
      telegram.sendChannel(
        TELEGRAM.CHANNEL.SYSTEM.ID,
        `${this._serviceName}_FAIL ${error}`
      );
    }
  }
  public async update(item: any) {
    return this._database.update(item);
  }
  public async delete(id: any) {
    try {
      await deleteDoc(doc(database, this._serviceName));
      telegram.sendChannel(
        TELEGRAM.CHANNEL.SYSTEM.ID,
        `${this._serviceName}\t ${id}`
      );
    } catch (error) {
      console.log(error);
      telegram.sendChannel(
        TELEGRAM.CHANNEL.SYSTEM.ID,
        `${this._serviceName}\t ${error}`
      );
    }
  }

  private getUserInfo(user: any) {
    return `id:\t${user.user_id}\n user_name:\t${user.username}\n `;
  }
}

export default OrderRepository;
