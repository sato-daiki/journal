import { useCallback } from 'react';
import { Keyboard } from 'react-native';
import * as StoreReview from 'expo-store-review';

import {
  DiaryStatus,
  User,
  Diary,
  LongCode,
  LanguageTool,
  ThemeCategory,
  ThemeSubcategory,
} from '@/types';
import { checkBeforePost, getRunning, getThemeDiaries } from '@/utils/diary';
import { logAnalytics, events } from '@/utils/Analytics';
import { alert } from '@/utils/ErrorAlert';
import { PostDiaryNavigationProp } from './interfaces';
import { useCommon } from './useCommont';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { getLanguageTool } from '@/utils/grammarCheck';

interface UsePostDiary {
  navigation: PostDiaryNavigationProp;
  themeTitle?: string;
  themeCategory?: ThemeCategory;
  themeSubcategory?: ThemeSubcategory;
  user: User;
  setUser: (user: User) => void;
  addDiary: (diary: Diary) => void;
}

export const usePostDiary = ({
  navigation,
  themeTitle,
  themeCategory,
  themeSubcategory,
  user,
  setUser,
  addDiary,
}: UsePostDiary) => {
  const {
    isModalCancel,
    isLoadingPublish,
    setIsLoadingPublish,
    isLoadingDraft,
    setIsLoadingDraft,
    isModalError,
    setIsModalError,
    title,
    text,
    selectedItem,
    errorMessage,
    setErrorMessage,
    onPressClose,
    onPressCloseModalCancel,
    onPressNotSave,
    onPressCloseError,
    onPressItem,
    onChangeTextTitle,
    onChangeTextText,
  } = useCommon({
    navigation,
    themeTitle,
    learnLanguage: user.learnLanguage,
  });

  const getDiary = useCallback(
    (
      uid: string,
      diaryStatus: DiaryStatus,
      languageTool?: LanguageTool,
    ): Diary => {
      const languageToolInfo = languageTool ? { languageTool } : undefined;
      return {
        uid: uid,
        title,
        text,
        themeCategory: themeCategory || null,
        themeSubcategory: themeSubcategory || null,
        diaryStatus,
        longCode: selectedItem.value as LongCode,
        ...languageToolInfo,
        createdAt:
          firestore.FieldValue.serverTimestamp() as FirebaseFirestoreTypes.Timestamp,
        updatedAt:
          firestore.FieldValue.serverTimestamp() as FirebaseFirestoreTypes.Timestamp,
      };
    },
    [title, text, themeCategory, themeSubcategory, selectedItem.value],
  );

  const onPressDraft = useCallback(async (): Promise<void> => {
    Keyboard.dismiss();
    if (isLoadingDraft || isLoadingPublish) return;
    try {
      setIsLoadingDraft(true);
      const diary = getDiary(user.uid, 'draft');
      const diaryRef = await firestore().collection('diaries').add(diary);
      // reduxに追加
      addDiary({
        objectID: diaryRef.id,
        ...diary,
        createdAt: firestore.Timestamp.now(),
      });
      setIsLoadingDraft(false);
      logAnalytics(events.CREATED_DIARY);
      navigation.navigate('Home', {
        screen: 'MyDiaryTab',
        params: { screen: 'MyDiaryList' },
      });
    } catch (err: any) {
      setIsLoadingDraft(false);
      alert({ err });
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
    Keyboard.dismiss();
    if (isLoadingDraft || isLoadingPublish) return;
    const isTitleSkip = !!themeCategory && !!themeSubcategory;

    const checked = checkBeforePost(isTitleSkip, title, text);
    if (!checked.result) {
      setErrorMessage(checked.errorMessage);
      setIsModalError(true);
      return;
    }

    setIsLoadingPublish(true);

    const languageTool = await getLanguageTool(
      selectedItem.value as LongCode,
      isTitleSkip,
      title,
      text,
    );

    const diary = getDiary(user.uid, 'checked', languageTool);
    const { runningDays, runningWeeks } = getRunning(user);

    let diaryId = '';
    let themeDiaries = user.themeDiaries || null;

    // 日記の更新の整合性をとるためtransactionを使う
    await firestore()
      .runTransaction(async (transaction) => {
        // diariesの更新
        const refDiary = firestore().collection('diaries').doc();
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
        const refUser = firestore().doc(`users/${user.uid}`);

        // 初回の場合はdiaryPostedを更新する
        const updateUser = {
          themeDiaries: themeDiaries || null,
          runningDays,
          runningWeeks,
          lastDiaryPostedAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
        } as Pick<
          User,
          | 'themeDiaries'
          | 'runningDays'
          | 'runningWeeks'
          | 'lastDiaryPostedAt'
          | 'updatedAt'
        >;
        transaction.update(refUser, updateUser);
      })
      .catch((err) => {
        setIsLoadingPublish(false);
        alert({ err });
      });
    logAnalytics(events.CREATED_DIARY);

    if (user.diaryPosted && (await StoreReview.hasAction())) {
      // 2回目以降の投稿の時
      await StoreReview.requestReview();
    }

    // reduxに追加
    addDiary({
      objectID: diaryId,
      ...diary,
      createdAt: firestore.Timestamp.now(),
    });
    setUser({
      ...user,
      themeDiaries,
      runningDays,
      runningWeeks,
      lastDiaryPostedAt: firestore.Timestamp.now(),
      diaryPosted: true,
    });

    setIsLoadingPublish(false);

    navigation.navigate('Home', {
      screen: 'MyDiaryTab',
      params: {
        screen: 'MyDiary',
        // @ts-ignore
        params: { objectID: diaryId, caller: 'PostDiary' },
      },
    });
  }, [
    addDiary,
    getDiary,
    isLoadingDraft,
    isLoadingPublish,
    navigation,
    selectedItem.value,
    setErrorMessage,
    setIsLoadingPublish,
    setIsModalError,
    setUser,
    text,
    themeCategory,
    themeSubcategory,
    title,
    user,
  ]);

  return {
    isLoadingDraft,
    isLoadingPublish,
    isModalCancel,
    isModalError,
    title,
    text,
    errorMessage,
    selectedItem,
    onPressCheck,
    onPressCloseModalCancel,
    onChangeTextTitle,
    onChangeTextText,
    onPressDraft,
    onPressNotSave,
    onPressClose,
    onPressCloseError,
    onPressItem,
  };
};
