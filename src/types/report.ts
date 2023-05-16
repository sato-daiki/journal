import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface Report {
  uid: string;
  targetUid: string;
  reason: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
}
