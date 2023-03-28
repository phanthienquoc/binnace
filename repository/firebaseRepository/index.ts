import { TELEGRAM } from './../../constants/constants';
import { database } from '../../src/providers/firebase';
import { doc, setDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { query, where, getDocs, collection } from 'firebase/firestore';
import telegram from '../../src/providers/telegram';
class FireBaseRepository {
  database: any;
  serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
    this.database = collection(database, serviceName);
    telegram.sendChannel(
      TELEGRAM.CHANNEL.SERVICE.ID,
      `Initial ${this.serviceName} Service`
    );
  }

  public async get(id: string) {
    let item: any;
    const q: any = await query(this.database, where('user_id', '==', id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      item = doc.data();
      // console.log(item.id, item);
    });

    return item;
  }
  public async getItems(params: any) {
    let items: any = [];
    const q = query(this.database);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      items = [...items, doc.data()];
    });

    return items;
  }
  public async create(item: any) {
    try {
      await addDoc(this.database, item);
    } catch (error) {
      // console.log(error);
    }
  }

  public async update(item: any) {
    return this.database.update(item);
  }

  public async delete(id: any) {
    try {
      await deleteDoc(doc(database, this.serviceName, `${id}`));
    } catch (error) {
      // console.log(error);
    }
  }
}

export default FireBaseRepository;
