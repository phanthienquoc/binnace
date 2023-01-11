import telegram from '../../../providers/telegram';

import IRepository from '../..';
import { TELEGRAM } from './../../../constants/constants';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { database } from './../../../providers/firebase/index';
import { query, where, getDocs, collection } from 'firebase/firestore';
class StockRepository extends IRepository {
  constructor(public iDatabase?: any, public serviceName?: string) {
    super(collection(database, 'stock'), 'stock');
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
  public async getItems(params: any) {
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
        await setDoc(doc(this._database, `${item.id}`), item);
        telegram.sendChannel(
          TELEGRAM.CHANNEL.SERVICE.ID,
          `${this._serviceName}\n ${JSON.stringify(item)}`
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
    telegram.sendChannel(
      TELEGRAM.CHANNEL.SERVICE.ID,
      `${this._serviceName}\n ${JSON.stringify(item)}`
    );
    return this._database.update(item);
  }
  public async delete(id: any) {
    try {
      await deleteDoc(doc(database, this._serviceName, `${id}`));
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

export default StockRepository;
