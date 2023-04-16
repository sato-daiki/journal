import firebase from '../constants/firebase';
import { getDisplayProfile, getUsePoints, updateYet } from './diary';
import { logAnalytics, events } from './Analytics';
import { Diary, CorrectionStatus, DisplaCorrection, Comment } from '../types';

interface UpdateDoneProps {
  summary: string;
  teachDiary: Diary;
  currentProfile: User;
  user: User;
  comments: Comment[];
  editTeachDiary: (objectID: string, diary: Diary) => void;
  setUser: (user: User) => void;
}

export type DataCorrectionStatus =
  | {
      correctionStatus: CorrectionStatus;
    }
  | {
      correctionStatus2: CorrectionStatus;
    }
  | {
      correctionStatus3: CorrectionStatus;
    };

type DataCorrection =
  | {
      correction: DisplaCorrection;
    }
  | {
      correction2: DisplaCorrection;
    }
  | {
      correction3: DisplaCorrection;
    };

export const getDataCorrectionStatus = (
  correctingCorrectedNum: number | null,
  correctionStatus: CorrectionStatus,
): DataCorrectionStatus | null => {
  if (correctingCorrectedNum === 1) {
    return { correctionStatus };
  }
  if (correctingCorrectedNum === 2) {
    return { correctionStatus2: correctionStatus };
  }
  if (correctingCorrectedNum === 3) {
    return { correctionStatus3: correctionStatus };
  }
  return null;
};

export const getDataCorrection = (
  correctingCorrectedNum: number | null,
  newCorrection,
): DataCorrection | null => {
  if (correctingCorrectedNum === 1) {
    return { correction: newCorrection };
  }
  if (correctingCorrectedNum === 2) {
    return { correction2: newCorrection };
  }
  if (correctingCorrectedNum === 3) {
    return { correction3: newCorrection };
  }
  return null;
};

export const updateDone = async ({
  summary,
  teachDiary,
  currentProfile,
  user,
  comments,
  editTeachDiary,
  setUser,
}: UpdateDoneProps): Promise<void> => {
  await firebase.firestore().runTransaction(async (transaction) => {
    const displayProfile = getDisplayProfile(currentProfile);
    const getPoints = getUsePoints(
      teachDiary.text.length,
      teachDiary.user.learnLanguage,
    );
    const newPoints = user.points + getPoints;
    if (!teachDiary.objectID) return;

    //  correctionsの更新
    const correctionRef = firebase.firestore().collection('corrections').doc();

    transaction.set(correctionRef, {
      objectID: teachDiary.objectID,
      user: displayProfile,
      comments,
      summary,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // 日記のステータスを未読に変更する
    const newCorrection = {
      id: correctionRef.id,
      user: displayProfile,
    };
    const diaryRef = firebase.firestore().doc(`diaries/${teachDiary.objectID}`);
    const dataStatus = getDataCorrectionStatus(
      user.correctingCorrectedNum,
      'unread',
    );

    const dataCorrection = getDataCorrection(
      user.correctingCorrectedNum,
      newCorrection,
    );

    transaction.update(diaryRef, {
      ...dataStatus,
      ...dataCorrection,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // 添削をしたuserの更新 ポイントを増やす correctingObjectIDをnull
    const currentUserRef = firebase.firestore().doc(`users/${user.uid}`);
    transaction.update(currentUserRef, {
      points: newPoints,
      correctingObjectID: null,
      correctingCorrectedNum: null,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // correctingsの削除
    const correctingRef = firebase
      .firestore()
      .doc(`correctings/${teachDiary.objectID}`);
    transaction.delete(correctingRef);

    logAnalytics(events.CREATED_CORRECTION);

    // reduxに追加
    editTeachDiary(teachDiary.objectID, {
      ...teachDiary,
      ...dataStatus,
      ...dataCorrection,
    });
    setUser({
      ...user,
      points: newPoints,
      correctingObjectID: null,
      correctingCorrectedNum: null,
    });
  });
};

export const onUpdateTimeUp = async (
  teachDiary: Diary,
  user: User,
  setIsLoading: Function,
  editTeachDiary: (objectID: string, data: Diary) => void,
  setUser: Function,
  setIsModalTimeUp: Function,
): Promise<void> => {
  if (!teachDiary.objectID) return;
  setIsLoading(true);
  // ステータスを戻す
  const data = getDataCorrectionStatus(user.correctingCorrectedNum, 'yet');

  if (!data) return;

  updateYet(teachDiary.objectID, user.uid, data);
  editTeachDiary(teachDiary.objectID, {
    ...teachDiary,
    ...data,
  });

  setUser({
    ...user,
    correctingObjectID: null,
    correctingCorrectedNum: null,
  });
  setIsLoading(false);
  setIsModalTimeUp(true);
};

export const onClose = (
  isLoading,
  teachDiary,
  setIsLoading,
  user,
  editTeachDiary,
  setUser,
  navigation,
): void => {
  if (isLoading || !teachDiary.objectID) return;
  setIsLoading(true);

  const data = getDataCorrectionStatus(user.correctingCorrectedNum, 'yet');
  // ステータスを戻す
  updateYet(teachDiary.objectID, user.uid, data);

  editTeachDiary(teachDiary.objectID, {
    ...teachDiary,
    ...data,
  });
  setUser({
    ...user,
    correctingObjectID: null,
    correctingCorrectedNum: null,
  });
  setIsLoading(false);
  navigation.goBack();
};
