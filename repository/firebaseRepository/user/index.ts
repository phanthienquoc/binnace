import telegram from '../../../src/providers/telegram';

import { TELEGRAM } from './../../../constants/constants';
import { database } from './../../../src/providers/firebase/index';
import { doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { query, where, getDocs, collection } from 'firebase/firestore';
import IRepository from '../..';
class UserRepository extends IRepository {
  constructor() {
    super(collection(database, 'user'), 'user');
  }

  public async get(id: string) {
    let user: any;
    const q: any = await query(this._database, where('user_id', '==', id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //// console.log(doc.id, ' => ', doc.data());
      user = doc.data();
    });

    return user;
  }
  public async getItems(params?: any) {
    let users: any = [];
    const q = query(this._database);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, ' => ', doc.data());
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
          TELEGRAM.CHANNEL.SYSTEM.ID,
          `&#10083;${this.getUserInfo(item)}`
        );
        return user;
      } else {
        throw new Error(`@${item.username} has registered!!!!`);
      }
    } catch (error) {
      telegram.sendChannel(
        TELEGRAM.CHANNEL.SYSTEM.ID,
        `CREATE_USER_FAIL ${error}`
      );
    }
  }
  public async update(item: any) {
    const userRef = doc(database, this._serviceName, `${item.user_id}`);
    // console.log('UPdate ', item);
    // Set the "capital" field of the city 'DC'
    await updateDoc(userRef, item);
    // return this._database.update(userRef, item);
  }
  public async delete(id: any) {
    try {
      await deleteDoc(doc(database, this._serviceName, `${id}`));
      telegram.sendChannel(
        TELEGRAM.CHANNEL.SYSTEM.ID,
        `&#9760; &#9760; &#9760;\t ${id}`
      );
    } catch (error) {
      // console.log(error);
      telegram.sendChannel(
        TELEGRAM.CHANNEL.SYSTEM.ID,
        `DELETE_USER_FAIL\t${error}`
      );
    }
  }

  private getUserInfo(user: any) {
    return `id:\t${user.user_id}\n user_name:\t${user.username}\n `;
  }
}

export default UserRepository;
