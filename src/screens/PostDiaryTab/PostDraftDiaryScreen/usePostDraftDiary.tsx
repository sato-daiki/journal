import { useState, useCallback, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { logAnalytics, events } from '@/utils/Analytics';
import { DiaryStatus, User, Diary, LongCode, LanguageTool } from '@/types';
import {
  checkBeforePost,
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
import firestore from '@react-native-firebase/firestore';
import {
  getLanguageTool,
  getLanguageToolShortName,
  getSapling,
} from '@/utils/grammarCheck';
import { Sapling } from '@/types/sapling';

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
    learnLanguage: user.learnLanguage,
  });

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setText(item.text);
      setSelectedItem({
        label: getLanguageToolShortName(item.longCode),
        value: item.longCode,
      });
    }
    setIsInitialLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDiary = useCallback(
    (
      diaryStatus: DiaryStatus,
      languageTool?: LanguageTool,
      sapling?: Sapling,
    ) => {
      return {
        firstDiary:
          diaryStatus === 'checked' &&
          (user.diaryPosted === undefined || user.diaryPosted === false),
        title,
        text,
        diaryStatus,
        longCode: selectedItem.value as LongCode,
        languageTool: languageTool || null,
        sapling: sapling || null,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };
    },
    [user.diaryPosted, title, text, selectedItem.value],
  );

  const onPressDraft = useCallback(async (): Promise<void> => {
    Keyboard.dismiss();
    if (isInitialLoading || isLoadingDraft || isLoadingPublish) return;
    try {
      if (!item || !item.objectID) return;

      setIsLoadingDraft(true);
      const diary = getDiary('draft');
      const refDiary = firestore().doc(`diaries/${item.objectID}`);
      await refDiary.update(diary);
      logAnalytics(events.CREATED_DIARY);

      // reduxを更新
      editDiary(item.objectID, {
        ...item,
        ...diary,
      });
      setIsLoadingDraft(false);
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
  ]);

  const onPressCheck = useCallback(async (): Promise<void> => {
    Keyboard.dismiss();
    if (isInitialLoading || isLoadingDraft || isLoadingPublish) return;
    if (!item.objectID) return;
    const isTitleSkip = !!item.themeCategory && !!item.themeSubcategory;

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
    const sapling = await getSapling(
      selectedItem.value as LongCode,
      isTitleSkip,
      title,
      text,
    );

    const diary = getDiary('checked', languageTool, sapling);
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

    await firestore()
      .runTransaction(async (transaction) => {
        if (!item || !item.objectID) return;
        const diaryRef = firestore().doc(`diaries/${item.objectID}`);
        transaction.update(diaryRef, diary);

        // 初回の場合はdiaryPostedを更新する
        const refUser = firestore().doc(`users/${user.uid}`);
        const updateUser = {
          themeDiaries,
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

    // reduxを更新
    editDiary(item.objectID, {
      ...item,
      ...diary,
      updatedAt: firestore.FieldValue.serverTimestamp(),
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
        params: { objectID: item.objectID },
      },
    });
  }, [
    editDiary,
    getDiary,
    isInitialLoading,
    isLoadingDraft,
    isLoadingPublish,
    item,
    navigation,
    selectedItem.value,
    setErrorMessage,
    setIsLoadingPublish,
    setIsModalError,
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
    isInitialLoading,
    isLoadingPublish,
    isLoadingDraft,
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
