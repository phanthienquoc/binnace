import { database } from '../index';
import { doc, getDoc, addDoc, setDoc, Timestamp } from 'firebase/firestore';
import { query, where, getDocs, collection } from 'firebase/firestore';

export const createTicket = async (userId: string, docData: any) => {
  console.log('createTicket', docData);

  let order = { ...docData };
  // docData = {
  //   label: 'Hello world!',
  //   quantity: 10,
  //   created_date: Timestamp.fromDate(new Date()),
  //   price: 3.14159265,
  //   action: ACTION_METHOD.BUY,
  // };
  let stockRef = collection(database, 'stocks');
  await addDoc(doc(database, 'stocks', userId), docData);
};
