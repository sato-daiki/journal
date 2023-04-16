import { firestore } from 'firebase';

export interface BlockUser {
  blockerUid: string;
  blockeeUid: string;
  createdAt: firestore.FieldValue;
}
