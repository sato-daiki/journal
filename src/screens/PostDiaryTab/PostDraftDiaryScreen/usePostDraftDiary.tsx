import { useState, useCallback, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { logAnalytics, events } from '@/utils/Analytics';
import { DiaryStatus, User, Diary } from '@/types';
import {
  getRunningDays,
  getRunningWeeks,
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
import spellChecker from '@/utils/spellChecker';

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
    isModalCancel,
    isLoadingPublish,
    setIsLoadingPublish,
    isLoadingDraft,
    setIsLoadingDraft,
    isModalAlert,
    setIsModalAlert,
    title,
    setTitle,
    text,
    setText,
    onPressClose,
    onPressCloseModalCancel,
    onPressNotSave,
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
    (diaryStatus: DiaryStatus, checkInfo?: any) => {
      return {
        firstDiary:
          diaryStatus === 'publish' &&
          (user.diaryPosted === undefined || user.diaryPosted === false),
        title,
        text,
        diaryStatus,
        checkInfo,
        updatedAt: serverTimestamp(),
      };
    },
    [user, text, title],
  );

  const onPressDraft = useCallback(async (): Promise<void> => {
    Keyboard.dismiss();
    if (isInitialLoading || isLoadingDraft || isLoadingPublish) return;
    try {
      if (!item || !item.objectID) return;

      setIsLoadingDraft(true);
      const diary = getDiary('draft');
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
    item,
    navigation,
    setIsLoadingDraft,
    setIsModalAlert,
  ]);

  const onPressCheck = useCallback(async (): Promise<void> => {
    Keyboard.dismiss();
    if (isInitialLoading || isLoadingDraft || isLoadingPublish) return;
    if (!item.objectID) return;

    setIsLoadingPublish(true);

    // チェック
    const checkData = await spellChecker(user.learnLanguage, title, text);
    const checkInfo = {
      language: checkData.language,
      matches: checkData.matches,
    };

    const diary = getDiary('publish', checkInfo);
    const runningDays = getRunningDays(
      user.runningDays,
      user.lastDiaryPostedAt,
    );
    const runningWeeks = getRunningWeeks(
      user.runningWeeks,
      user.lastDiaryPostedAt,
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
        lastDiaryPostedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      } as Pick<
        User,
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
    });
    setIsLoadingPublish(false);
  }, [
    editDiary,
    getDiary,
    isInitialLoading,
    isLoadingDraft,
    isLoadingPublish,
    item,
    setIsLoadingPublish,
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
    isModalAlert,
    isModalCancel,
    title,
    text,
    onPressCheck,
    onPressCloseModalCancel,
    onChangeTextTitle,
    onChangeTextText,
    onPressDraft,
    onPressNotSave,
    onPressClose,
  };
};
