import { db } from '@/constants/firebase';
import { User } from '@/types';
import { collection, doc, getDoc } from '@firebase/firestore';

const getTimeInfo = (timeInfo: any) => {
  console.log('getTimeInfo');
  if (timeInfo.reminderType === 'fix') {
    return {
      ...timeInfo,
      fixTimeInfo: {
        ...timeInfo.fixTimeInfo,
        timeStart: timeInfo.fixTimeInfo.timeStart.toDate(),
        timeEnd: timeInfo.fixTimeInfo.timeEnd.toDate(),
      },
    };
  }
  return {
    ...timeInfo,
    customTimeInfos: timeInfo.customTimeInfos.map((item) => {
      return {
        ...item,
        timeStart: item.timeStart.toDate(),
        timeEnd: item.timeEnd.toDate(),
      };
    }),
  };
};

// ユーザ情報取得
export const getUser = async (uid: string): Promise<User | null> => {
  try {
    const usersRef = collection(db, 'users');
    const docSnap = await getDoc(doc(usersRef, uid));
    const data = docSnap.data();
    if (data) {
      return {
        ...data,
        uid,
        reminder: data.reminder
          ? {
              ...data.reminder,
              timeInfo: getTimeInfo(data.reminder.timeInfo),
            }
          : undefined,
      } as User;
    }
  } catch (e) {
    console.warn(e);
    return null;
  }
  return null;
};
