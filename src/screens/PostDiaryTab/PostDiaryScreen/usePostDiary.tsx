import { useState, useCallback } from 'react';
import { Keyboard } from 'react-native';
import * as StoreReview from 'expo-store-review';

import { DiaryStatus, User, Diary, CheckInfo, LongCode } from '@/types';
import {
  checkBeforePost,
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
import firestore from '@react-native-firebase/firestore';
import { spellChecker } from '@/utils/spellChecker';

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
    isModalError,
    setIsModalError,
    title,
    setTitle,
    text,
    setText,
    selectedItem,
    setSelectedItem,
    errorMessage,
    setErrorMessage,
    onPressClose,
    onPressCloseModalCancel,
    onPressNotSave,
    onPressCloseError,
    onPressItem,
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
        longCode: selectedItem.value as LongCode,
        checkInfo: checkInfo || null,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };
    },
    [
      user.diaryPosted,
      title,
      text,
      themeCategory,
      themeSubcategory,
      selectedItem.value,
    ],
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
    const checked = checkBeforePost(title, text);
    if (!checked.result) {
      setErrorMessage(checked.errorMessage);
      setIsModalError(true);
      return;
    }

    setIsLoadingPublish(true);

    // チェック
    const checkData = await spellChecker(
      selectedItem.value as LongCode,
      title,
      text,
    );
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
          | 'diaryPosted'
        >;
        if (!user.diaryPosted) {
          updateUser.diaryPosted = true;
        }
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
        params: { objectID: diaryId },
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
