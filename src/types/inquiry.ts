import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface Inquiry {
  uid: string;
  email: string;
  message: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
}
