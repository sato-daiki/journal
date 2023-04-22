import { useState, useCallback } from 'react';
import { Keyboard } from 'react-native';

import { DiaryStatus, User, Diary, CheckInfo } from '@/types';
import {
  getRunningDays,
  getRunningWeeks,
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
  addDoc,
  collection,
  runTransaction,
} from '@firebase/firestore';
import { db } from '@/constants/firebase';
import spellChecker from '@/utils/spellChecker';

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

  const themeTitle = route?.params?.themeTitle;
  const themeCategory = route?.params?.themeCategory;
  const themeSubcategory = route?.params?.themeSubcategory;
  const {
    isModalCancel,
    isLoadingPublish,
    setIsLoadingPublish,
    isLoadingDraft,
    setIsLoadingDraft,
    title,
    setTitle,
    text,
    setText,
    onPressClose,
    onPressCloseModalCancel,
    onPressNotSave,
  } = useCommon({
    navigation,
    themeTitle,
    learnLanguage: user.learnLanguage,
  });

  const getDiary = useCallback(
    (uid: string, diaryStatus: DiaryStatus, checkInfo?: CheckInfo): Diary => {
      return {
        // 最初の日記かチェック
        uid: uid,
        firstDiary:
          diaryStatus === 'checked' &&
          (user.diaryPosted === undefined || user.diaryPosted === false),
        hidden: false,
        title,
        text,
        themeCategory: themeCategory || null,
        themeSubcategory: themeSubcategory || null,
        diaryStatus,
        checkInfo: checkInfo || null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
    },
    [user, title, text, themeCategory, themeSubcategory],
  );

  const onPressDraft = useCallback(async (): Promise<void> => {
    Keyboard.dismiss();
    if (isLoadingDraft || isLoadingPublish) return;
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
    navigation,
    setIsLoadingDraft,
    user.uid,
  ]);

  const onPressCheck = useCallback(async (): Promise<void> => {
    if (isLoadingDraft || isLoadingPublish) return;
    setIsLoadingPublish(true);

    // チェック
    const checkData = await spellChecker(user.learnLanguage, title, text);
    const checkInfo = {
      language: checkData.language,
      matches: checkData.matches,
    };

    const diary = getDiary(user.uid, 'checked', checkInfo);
    const runningDays = getRunningDays(
      user.runningDays,
      user.lastDiaryPostedAt,
    );
    const runningWeeks = getRunningWeeks(
      user.runningWeeks,
      user.lastDiaryPostedAt,
    );
    let diaryId = '';
    let themeDiaries = user.themeDiaries || null;

    // 日記の更新の整合性をとるためtransactionを使う
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
    });
    setIsLoadingPublish(false);
    navigation.navigate('Home', {
      screen: 'MyDiaryTab',
      params: {
        screen: 'MyDiary',
        params: { objectID: diaryId },
      },
    });
  }, [
    addDiary,
    getDiary,
    isLoadingDraft,
    isLoadingPublish,
    navigation,
    setIsLoadingPublish,
    setUser,
    text,
    themeCategory,
    themeSubcategory,
    title,
    user,
  ]);

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
    isModalCancel,
    isFirstEdit,
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
