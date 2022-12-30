import { firebaseConfig } from './config';
import { initializeApp } from 'firebase/app';

import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  Timestamp,
  getFirestore,
} from 'firebase/firestore';

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebase);

export default firebase;

export const createData = async (
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
  await setDoc(doc(db, 'data', 'one'), docData);
};

class City {
  name: string;
  state: string;
  country: string;
  constructor(name: string, state: string, country: string) {
    this.name = name;
    this.state = state;
    this.country = country;
  }
  toString() {
    return this.name + ', ' + this.state + ', ' + this.country;
  }
}

// Firestore data converter
const cityConverter = {
  toFirestore: (city: City) => {
    return {
      name: city.name,
      state: city.state,
      country: city.country,
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new City(data.name, data.state, data.country);
  },
};

export const initData = async (collectionName = 'users', userId: string) => {
  try {
    console.log('xxinti app');
    const collectionNameRef = collection(db, collectionName);
    await setDoc(doc(collectionNameRef, userId), {
      name: 'San Francisco',
      state: 'CA',
      country: 'USA',
      capital: false,
      population: 860000,
      regions: ['west_coast', 'norcal'],
    });
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
