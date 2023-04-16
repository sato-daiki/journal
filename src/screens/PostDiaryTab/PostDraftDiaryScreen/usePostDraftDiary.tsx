import { useState, useCallback, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { logAnalytics, events } from '@/utils/Analytics';
import { DiaryStatus, User, Diary } from '@/types';
import {
  getUsePoints,
  getDisplayProfile,
  getRunningDays,
  getRunningWeeks,
  getPublishMessage,
  getThemeDiaries,
} from '@/utils/diary';
import { alert } from '@/utils/ErrorAlert';
import {
  PostDraftDiaryNavigationProp,
  PostDraftDiaryRouteProp,
} from './interfaces';
import { useCommon } from '../PostDiaryScreen/useCommont';
import {
  Timestamp,
  runTransaction,
  serverTimestamp,
  doc,
  updateDoc,
} from '@firebase/firestore';
import { db } from '@/constants/firebase';

interface UsePostDraftDiary {
  user: User;
  setUser: (user: User) => void;
  editDiary: (objectID: string, diary: Diary) => void;
  navigation: PostDraftDiaryNavigationProp;
  route: PostDraftDiaryRouteProp;
}

export const usePostDraftDiary = ({
  navigation,
  route,
  user,
  setUser,
  editDiary,
}: UsePostDraftDiary) => {
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const { item } = route.params;

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
    points: user.points,
    learnLanguage: user.learnLanguage,
  });

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setText(item.text);
    }
    setIsInitialLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDiary = useCallback(
    (diaryStatus: DiaryStatus) => {
      return {
        firstDiary:
          diaryStatus === 'publish' &&
          (user.diaryPosted === undefined || user.diaryPosted === false),
        title,
        text,
        diaryStatus,
        updatedAt: serverTimestamp(),
      };
    },
    [user, text, title],
  );

  const onPressDraft = useCallback(async (): Promise<void> => {
    console.log('onPressDraft');

    Keyboard.dismiss();
    if (isInitialLoading || isLoadingDraft || isLoadingPublish || isModalLack)
      return;
    try {
      if (!item || !item.objectID) return;

      setIsLoadingDraft(true);
      const diary = getDiary('draft');
      console.log('diary', diary);
      await updateDoc(doc(db, `diaries`, item.objectID), diary);
      logAnalytics(events.CREATED_DIARY);

      // reduxを更新
      editDiary(item.objectID, {
        ...item,
        ...diary,
      });
      setIsLoadingDraft(false);
      setIsModalAlert(false);

      navigation.navigate('Home', {
        screen: 'MyDiaryTab',
        params: { screen: 'MyDiaryList' },
      });
    } catch (err: any) {
      setIsLoadingDraft(false);
      alert({ err });
    }
  }, [
    editDiary,
    getDiary,
    isInitialLoading,
    isLoadingDraft,
    isLoadingPublish,
    isModalLack,
    item,
    navigation,
    setIsLoadingDraft,
    setIsModalAlert,
  ]);

  const onPressSubmit = useCallback(async (): Promise<void> => {
    Keyboard.dismiss();
    if (isInitialLoading || isLoadingDraft || isLoadingPublish) return;
    if (!item.objectID) return;

    setIsLoadingPublish(true);
    const diary = getDiary('publish');
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

    let { themeDiaries } = user;
    if (item.themeCategory && item.themeSubcategory) {
      themeDiaries = getThemeDiaries(
        user.themeDiaries,
        item.objectID,
        item.themeCategory,
        item.themeSubcategory,
      );
    }

    await runTransaction(db, async (transaction) => {
      if (!item || !item.objectID) return;
      transaction.update(doc(db, 'diaries', item.objectID), diary);

      // 初回の場合はdiaryPostedを更新する
      const updateUser = {
        themeDiaries,
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

    // reduxを更新
    editDiary(item.objectID, {
      ...item,
      title,
      text,
      diaryStatus: 'publish',
      updatedAt: serverTimestamp(),
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
    editDiary,
    getDiary,
    isInitialLoading,
    isLoadingDraft,
    isLoadingPublish,
    item,
    setIsLoadingPublish,
    setIsPublish,
    setPublishMessage,
    setUser,
    text,
    title,
    user,
  ]);

  const onChangeTextTitle = useCallback(
    (txt) => {
      setTitle(txt);
    },
    [setTitle],
  );

  const onChangeTextText = useCallback(
    (txt) => {
      setText(txt);
    },
    [setText],
  );

  return {
    isLoadingDraft,
    isLoadingPublish,
    isInitialLoading,
    isModalLack,
    isModalAlert,
    isModalCancel,
    isModalError,
    isPublish,
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
    onPressCloseError,
    onPressClose,
    onPressPublic,
  };
};
