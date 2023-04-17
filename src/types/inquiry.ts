import { FieldValue } from '@firebase/firestore';

export interface Inquiry {
  uid: string;
  email: string;
  message: string;
  createdAt: FieldValue;
}
