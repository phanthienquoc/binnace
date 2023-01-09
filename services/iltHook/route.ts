import { getData } from './../../providers/firebase/index';
import { Express, Request, Response } from 'express';
import { firebaseConfig } from '../../providers/firebase/config';
import firebase, { db } from '../../providers/firebase';
import { createUser, getUser, getUsers } from '../../providers/firebase/users';
import {
  collection,
  query,
  where,
  doc,
  setDoc,
  getDocs,
} from 'firebase/firestore';

const iltHookRoute = (app: Express) => {
  app.get('/users', async (req: Request, res: Response) => {
    getUsers();
    // let usersRef = collection(db, 'users');

    // const citiesRef = collection(db, 'cities');

    // // const q = query(collection(db, 'users'), where('user_id', '!=', true));
    // const q = query(collection(db, 'users'));

    // const querySnapshot = await getDocs(q);
    // let restData = <any>[];
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   restData.push({
    //     docId: doc.id,
    //     ...doc.data(),
    //   });
    //   console.log(doc.id, ' => ', {
    //     docId: doc.id,
    //     ...doc.data(),
    //   });
    // });
    // res.send(JSON.stringify(userRef));
  });
};

export default iltHookRoute;
