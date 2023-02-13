import telegram from '../telegram';

import { firebaseConfig } from './config';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { TELEGRAM } from './../../constants/constants';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const database = getFirestore(firebase);
export const auth = getAuth(app);

export const adminSystemLogin = async () => {
  try {
    let systemEmail = process.env.ADMIN_EMAIL || '';
    let systemPassword = process.env.ADMIN_PASSWORD || '';

    await signInWithEmailAndPassword(auth, systemEmail, systemPassword);
    /**
     * TODO
     * Enable for channel notify
     * telegram.sendChannel(
     * TELEGRAM.CHANNEL.SYSTEM.ID,
     * `<b>&#128127; ADMIN FIREBASE LOGGED IN!!! &#128127;</b>`
     * );
     */
  } catch (error) {
    console.log(error);
  }
};

export default firebase;
