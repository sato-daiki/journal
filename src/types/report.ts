import { firestore } from 'firebase';

export interface Report {
  uid: string;
  targetUid: string;
  reason: string;
  createdAt: firestore.FieldValue;
}
