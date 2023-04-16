import firebase from '../constants/firebase';

/**
 * getBlockers: ブロックしているuid一覧を取得する
 * @param uid : uid
 */
export const getBlockers = async (uid: string): Promise<string[]> => {
  const docs = await firebase
    .firestore()
    .collection('blockUsers')
    .where('blockerUid', '==', uid)
    .get();
  const uids: string[] = [];
  docs.forEach(doc => {
    uids.push(doc.data().blockeeUid);
  });
  return uids;
};

/**
 * getBlockers: ブロックされているuid一覧を取得する
 * @param uid : uid
 */
export const getBlockees = async (uid: string): Promise<string[]> => {
  const docs = await firebase
    .firestore()
    .collection('blockUsers')
    .where('blockeeUid', '==', uid)
    .get();
  const uids: string[] = [];
  docs.forEach(doc => {
    uids.push(doc.data().blockerUid);
  });
  return uids;
};

/**
 * checkBlockee: ブロックされているかのチェック
 * @param currenctUid アプリ使用ユーザ
 * @param targetUid 対象のユーザ
 */
export const checkBlockee = async (
  currenctUid: string,
  targetUid: string
): Promise<boolean> => {
  const docs = await firebase
    .firestore()
    .collection('blockUsers')
    .where('blockeeUid', '==', currenctUid)
    .where('blockerUid', '==', targetUid)
    .get();
  if (docs.empty) {
    return false;
  }
  return true;
};

/**
 * checkBlockee: ブロックしているかのチェック
 * @param currenctUid アプリ使用ユーザ
 * @param targetUid 対象のユーザ
 */
export const checkBlocker = async (
  currenctUid: string,
  targetUid: string
): Promise<boolean> => {
  const docs = await firebase
    .firestore()
    .collection('blockUsers')
    .where('blockeeUid', '==', targetUid)
    .where('blockerUid', '==', currenctUid)
    .get();
  if (docs.empty) {
    return false;
  }
  return true;
};
