import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyAh1HPR0mWaOVOg_N9M_CnEv2bvOxSbQ8Q',
  authDomain: 'journal-prd.firebaseapp.com',
  projectId: 'journal-prd',
  storageBucket: 'journal-prd.appspot.com',
  messagingSenderId: '104706740871',
  appId: '1:104706740871:web:0346716de245dc91755e22',
  measurementId: 'G-NN7BSE10F0',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
