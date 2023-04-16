import { useState, useCallback } from 'react';
import { Keyboard } from 'react-native';

import { DiaryStatus, User, Diary } from '@/types';
import {
  getUsePoints,
  getDisplayProfile,
  getRunningDays,
  getRunningWeeks,
  getPublishMessage,
  getThemeDiaries,
} from '@/utils/diary';
import { logAnalytics, events } from '@/utils/Analytics';
import { alert } from '@/utils/ErrorAlert';
import { ModalPostDiaryStackParamList } from '@/navigations/ModalNavigator';
import { RouteProp } from '@react-navigation/native';
import { PostDiaryNavigationProp } from './interfaces';
import { useCommon } from './useCommont';
import {
  Timestamp,
  doc,
  serverTimestamp,
  updateDoc,
  addDoc,
  collection,
  runTransaction,
} from '@firebase/firestore';
import { db } from '@/constants/firebase';

interface UsePostDiary {
  navigation: PostDiaryNavigationProp;
  route?: RouteProp<ModalPostDiaryStackParamList, 'PostDiary'>;
  user: User;
  setUser: (user: User) => void;
  addDiary: (diary: Diary) => void;
}

export const usePostDiary = ({
  navigation,
  route,
  user,
  setUser,
  addDiary,
}: UsePostDiary) => {
  const [isFirstEdit, setIsFirstEdit] = useState(false);
  const [isTutorialLoading, setIsTutorialLoading] = useState(false);

  const themeTitle = route?.params?.themeTitle;
  const themeCategory = route?.params?.themeCategory;
  const themeSubcategory = route?.params?.themeSubcategory;
  const {
    isModalLack,
    isModalCancel,
    isModalError,
    errorMessage,
    isLoadingPublish,
    setIsLoadingPublish,
    isLoadingDraft,
    setIsLoadingDraft,
    isModalAlert,
    setIsModalAlert,
    isPublish,
    setIsPublish,
    title,
    setTitle,
    text,
    setText,
    publishMessage,
    setPublishMessage,
    onPressPublic,
    onPressClose,
    onPressCloseError,
    onPressCloseModalPublish,
    onPressCloseModalCancel,
    onPressSubmitModalLack,
    onClosePostDiary,
    onPressNotSave,
    onPressCloseModalLack,
    onPressWatchAdModalLack,
  } = useCommon({
    navigation,
    themeTitle,
    points: user.points,
    learnLanguage: user.learnLanguage,
  });

  const getDiary = useCallback(
    (uid: string, diaryStatus: DiaryStatus): Diary => {
      return {
        // 最初の日記かチェック
        uid: uid,
        firstDiary:
          diaryStatus === 'publish' &&
          (user.diaryPosted === undefined || user.diaryPosted === false),
        hidden: false,
        title,
        text,
        themeCategory: themeCategory || null,
        themeSubcategory: themeSubcategory || null,
        diaryStatus,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
    },
    [user, title, text, themeCategory, themeSubcategory],
  );

  const onPressDraft = useCallback(async (): Promise<void> => {
    Keyboard.dismiss();
    if (isLoadingDraft || isLoadingPublish || isModalLack) return;
    try {
      setIsLoadingDraft(true);
      const diary = getDiary(user.uid, 'draft');
      const diaryRef = await addDoc(collection(db, 'diaries'), diary);

      // reduxに追加
      addDiary({
        objectID: diaryRef.id,
        ...diary,
      });
      setIsLoadingDraft(false);
      setIsModalAlert(false);
      logAnalytics(events.CREATED_DIARY);
      navigation.navigate('Home', {
        screen: 'MyDiaryTab',
        params: { screen: 'MyDiaryList' },
      });
    } catch (err: any) {
      alert({ err });
      setIsLoadingDraft(false);
    }
  }, [
    addDiary,
    getDiary,
    isLoadingDraft,
    isLoadingPublish,
    isModalLack,
    navigation,
    setIsLoadingDraft,
    setIsModalAlert,
    user.uid,
  ]);

  const onPressSubmit = useCallback(async (): Promise<void> => {
    if (isLoadingDraft || isLoadingPublish) return;
    setIsLoadingPublish(true);
    const diary = getDiary(user.uid, 'publish');
    const usePoints = getUsePoints(text.length, user.learnLanguage);
    const newPoints = user.points - usePoints;
    const runningDays = getRunningDays(
      user.runningDays,
      user.lastDiaryPostedAt,
    );
    const runningWeeks = getRunningWeeks(
      user.runningWeeks,
      user.lastDiaryPostedAt,
    );
    const message = getPublishMessage(
      user.runningDays,
      user.runningWeeks,
      runningDays,
      runningWeeks,
    );
    let diaryId = '';
    let themeDiaries = user.themeDiaries || null;

    // 日記の更新とpointsの整合性をとるためtransactionを使う
    await runTransaction(db, async (transaction) => {
      // diariesの更新
      const refDiary = await addDoc(collection(db, 'diaries'), diary);
      diaryId = refDiary.id;
      transaction.set(refDiary, diary);

      // Usersの更新
      if (themeCategory && themeSubcategory) {
        themeDiaries = getThemeDiaries(
          user.themeDiaries,
          diaryId,
          themeCategory,
          themeSubcategory,
        );
      }

      // 初回の場合はdiaryPostedを更新する
      const updateUser = {
        themeDiaries: themeDiaries || null,
        runningDays,
        runningWeeks,
        points: newPoints,
        lastDiaryPostedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      } as Pick<
        User,
        | 'points'
        | 'themeDiaries'
        | 'runningDays'
        | 'runningWeeks'
        | 'lastDiaryPostedAt'
        | 'updatedAt'
        | 'diaryPosted'
      >;
      if (!user.diaryPosted) {
        updateUser.diaryPosted = true;
      }
      transaction.update(doc(db, 'users', user.uid), updateUser);
    }).catch((err) => {
      setIsLoadingPublish(false);
      alert({ err });
    });
    logAnalytics(events.CREATED_DIARY);
    // reduxに追加
    addDiary({
      objectID: diaryId,
      ...diary,
    });
    setUser({
      ...user,
      themeDiaries,
      runningDays,
      runningWeeks,
      lastDiaryPostedAt: Timestamp.now(),
      diaryPosted: true,
      points: newPoints,
    });
    setPublishMessage(message);
    setIsLoadingPublish(false);
    setIsPublish(true);
  }, [
    addDiary,
    getDiary,
    isLoadingDraft,
    isLoadingPublish,
    setIsLoadingPublish,
    setIsPublish,
    setPublishMessage,
    setUser,
    text.length,
    themeCategory,
    themeSubcategory,
    user,
  ]);

  const onPressTutorial = useCallback(async (): Promise<void> => {
    setIsTutorialLoading(true);

    await updateDoc(doc(db, 'users', user.uid), {
      tutorialPostDiary: true,
      updatedAt: serverTimestamp(),
    });
    setUser({
      ...user,
      tutorialPostDiary: true,
    });
    setIsTutorialLoading(false);
  }, [setUser, user]);

  const onChangeTextTitle = useCallback(
    (txt) => {
      if (!isFirstEdit) setIsFirstEdit(true);
      setTitle(txt);
    },
    [isFirstEdit, setTitle],
  );

  const onChangeTextText = useCallback(
    (txt) => {
      if (!isFirstEdit) setIsFirstEdit(true);
      setText(txt);
    },
    [isFirstEdit, setText],
  );

  return {
    isLoadingDraft,
    isLoadingPublish,
    isModalLack,
    isModalAlert,
    isModalCancel,
    isModalError,
    isPublish,
    isFirstEdit,
    isTutorialLoading,
    errorMessage,
    title,
    text,
    publishMessage,
    onPressSubmitModalLack,
    onPressCloseModalLack,
    onPressWatchAdModalLack,
    onPressCloseModalPublish,
    onPressCloseModalCancel,
    onClosePostDiary,
    onChangeTextTitle,
    onChangeTextText,
    onPressSubmit,
    onPressDraft,
    onPressNotSave,
    onPressTutorial,
    onPressCloseError,
    onPressClose,
    onPressPublic,
  };
};
