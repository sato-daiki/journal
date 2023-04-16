import { Language } from './user';
// import firebase from 'firebase';

export interface Inquiry {
  uid: string;
  userName: string;
  nativeLanguage: Language;
  email: string;
  message: string;
  // createdAt: firebase.firestore.FieldValue;
}
