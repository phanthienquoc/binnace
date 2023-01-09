import { firebaseConfig } from './config';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebase);
export const auth = getAuth(app);

export const adminSystemLogin = async () => {
  try {
    let systemEmail = process.env.ADMIN_EMAIL || '';
    let systemPassword = process.env.ADMIN_PASSWORD || '';

    await signInWithEmailAndPassword(auth, systemEmail, systemPassword);
  } catch (error) {
    console.log(error);
  }
};

export default firebase;
