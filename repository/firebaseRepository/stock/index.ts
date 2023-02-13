import telegram from '../../../providers/telegram';

import IRepository from '../..';
import { TELEGRAM } from './../../../constants/constants';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { database } from './../../../providers/firebase/index';
import {
  query,
  where,
  getDocs,
  updateDoc,
  collection,
} from 'firebase/firestore';
class StockRepository extends IRepository {
  constructor(public iDatabase?: any, public serviceName?: string) {
    super(collection(database, 'stock'), 'stock');
  }

  public async get(id: string) {
    let item: any;
    const q: any = await query(this._database, where('id', '==', id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, ' => ', doc.data());
      item = doc.data();
    });

    return item;
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
    const itemRef = doc(database, this._serviceName, `${item.id}`);
    await updateDoc(itemRef, item);
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
}

export default StockRepository;
