import { db } from '../index';
import { doc, getDoc, addDoc, setDoc, Timestamp } from 'firebase/firestore';
import { query, where, getDocs, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { ACTION_METHOD } from '../../../services/stock/model';

export const auth = getAuth();

export const createTicket = async (docData: any) => {
  console.log('createTicket', docData);
  // docData = {
  //   label: 'Hello world!',
  //   quantity: 10,
  //   created_date: Timestamp.fromDate(new Date()),
  //   price: 3.14159265,
  //   action: ACTION_METHOD.BUY,
  // };
  // await setDoc(doc(db, 'stocks', 'one'), docData);
};
