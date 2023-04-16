// import { firestore } from 'firebase';
import { Review } from '../types';
import firebase from '../constants/firebase';

export const getTopReviews = async (uid: string): Promise<Review[]> => {
  // try {
  //   const snapshot = await firebase
  //     .firestore()
  //     .collection('reviews')
  //     .where('revieweeUid', '==', uid)
  //     .orderBy('createdAt', 'desc')
  //     .limit(3)
  //     .get();
  //   const topReviews: Review[] = [];
  //   snapshot.forEach((doc) => {
  //     topReviews.push(doc.data() as Review);
  //   });
  //   return topReviews;
  // } catch (e) {
  //   console.warn('topReviews', e);
  //   return [];
  // }
};

export const getReviews = async (
  uid: string,
  lastVisible: firestore.FieldValue | Date | null,
  hitPerPage: number,
): Promise<Review[]> => {
  try {
    const snapshot = await firebase
      .firestore()
      .collection('reviews')
      .where('revieweeUid', '==', uid)
      .orderBy('createdAt', 'desc')
      .startAfter(lastVisible)
      .limit(hitPerPage)
      .get();

    const reviews: Review[] = [];

    snapshot.forEach((doc) => {
      reviews.push(doc.data() as Review);
    });
    return reviews;
  } catch (e) {
    console.warn('getReviews', e);
    return [];
  }
};

export const getReviewNum = async (uid: string): Promise<number> => {
  const snap = await firebase
    .firestore()
    .collection('reviews')
    .where('revieweeUid', '==', uid)
    .get();
  return snap.size;
};
