import { db } from '../index';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
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

export const createUser = async (
  docData = {
    stringExample: 'Hello world!',
    booleanExample: true,
    numberExample: 3.14159265,
    dateExample: Timestamp.fromDate(new Date('December 10, 1815')),
    arrayExample: [5, true, 'hello'],
    nullExample: null,
    objectExample: {
      a: 5,
      b: {
        nested: 'foo',
      },
    },
  }
) => {
  await setDoc(doc(db, 'users', 'one'), docData);
};

export const updateUser = async () => {};

export const deleteUser = async () => {};

export const getUsers = async () => {};

export const getUser = async () => {};

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

export const initData = async (collectionPath = 'users', userId: string) => {
  try {
    // await setDoc(doc(db, collectionPath, `${userId}`, 'dates', '123'), {
    //   name: 'Los Angeles',
    //   state: 'CA',
    //   country: 'USA',
    // });

    // const newCityRef = doc(collection(db, collectionPath, 'contacts'));

    // Add a new document with a generated id.
    const docRef = await addDoc(
      collection(db, collectionPath, `${userId}`, 'contacts'),
      {
        name: 'Tokyo',
        country: 'Japan',
        // created_at: Timestamp.fromDate(new Date()),
        created_at: new Date().getTime(),
      }
    );
    console.log('Document written with ID: ', docRef.id);

    // await setDoc(doc(db, collectionPath, `${userId}`, 'contacts', '123'), {
    //   name: 'Los Angeles',
    //   state: 'CA',
    //   country: 'USA',
    // });

    // console.log(doc(db, `${collectionPath}\${userId}`));

    // let pathSegments = `${userId}/dates`;
    // const collectionNameRef = collection(db, collectionPath, userId);
    // await setDoc(doc(collectionNameRef, collectionPath, userId), {
    //   name: 'Los Angeles',
    //   state: 'CA',
    //   country: 'USA',
    // });
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};

export const getData = async () => {
  try {
    const docRef = doc(db, 'cities', 'SF');
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
