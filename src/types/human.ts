import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type HumanStatus = 'yet' | 'unread' | 'done';

export interface HumanCorrect {
  original: string;
  correction?: string;
}

export interface Human {
  status: HumanStatus;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  doneAt?: FirebaseFirestoreTypes.Timestamp;
  titleCorrects: HumanCorrect[] | [] | null;
  textCorrects: HumanCorrect[] | [] | null;
}
