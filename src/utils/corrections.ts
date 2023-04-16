import { Correction } from '../types/correction';
import firebase from '../constants/firebase';

export const getCorrection = async (id: string): Promise<Correction | null> => {
  try {
    const doc = await firebase.firestore().doc(`corrections/${id}`).get();
    const data = doc.data();
    if (data) {
      const { objectID, user, comments, summary, createdAt } = data;

      return {
        objectID,
        user,
        comments,
        summary,
        createdAt,
      };
    }
  } catch (e) {
    return null;
  }
  return null;
};
