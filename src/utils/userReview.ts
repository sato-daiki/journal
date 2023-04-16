import { UserReview } from '../types';
import firebase from '../constants/firebase';

export const getUserReview = async (
  uid: string
): Promise<UserReview | null> => {
  try {
    const doc = await firebase
      .firestore()
      .doc(`userReviews/${uid}`)
      .get();
    const data = doc.data();
    if (data) {
      const { score, ratingSum, reviewNum, createdAt, updatedAt } = data;
      return {
        uid,
        ratingSum,
        reviewNum,
        score,
        createdAt,
        updatedAt,
      };
    }
  } catch (e) {
    return null;
  }
  return null;
};
