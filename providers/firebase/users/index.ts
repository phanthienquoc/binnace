import { database } from '../index';
import { doc, getDoc, addDoc, setDoc, Timestamp } from 'firebase/firestore';
import { query, where, getDocs, collection } from 'firebase/firestore';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

interface ILogin {
  email: string;
  password: string;
}

export const auth = getAuth();

export const createUser = async (docData: any) => {
  let user = await getUser({ user_id: docData.user_id });
  if (!user) {
    let userRef = collection(database, 'users');
    await addDoc(userRef, docData);
  }
};

export const updateUser = async () => {};

export const deleteUser = async () => {};

export const getUsers = async () => {
  const userRef = collection(database, 'users');
  const docSnap = await getDocs(userRef);

  let listUser = <any>[];
  docSnap.forEach((doc) => {
    listUser = [...listUser, doc.data()];
  });

  return listUser;
};

export const getUser = async ({ user_id }: any) => {
  const q = query(
    collection(database, 'users'),
    where('user_id', '==', user_id)
  );
  const querySnapshot = await getDocs(q);
  let user = null;
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
    user = doc.data();
  });

  return user;
};

export const register = async ({ email, password }: ILogin) => {
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (err) {
    console.error(err);
  }
};

export const addContact = async (contact: any) => {};

export const login = async ({ email, password }: ILogin) => {
  try {
    let userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential.user.uid);
    // console.log(JSON.stringify(userCredential));
    return userCredential;
  } catch (err) {
    console.error(err);
  }
};

export const getData = async () => {
  try {
    const docRef = doc(database, 'cities', 'SF');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  } catch (error) {}
};

export default {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUser,
  register,
  login,
};
