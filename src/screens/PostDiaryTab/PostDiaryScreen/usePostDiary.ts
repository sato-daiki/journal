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
  ImageInfo,
} from '@/types';
import {
  checkBeforePost,
  getRunning,
  getThemeDiaries,
  getTitleTextPrettier,
} from '@/utils/diary';
import { logAnalytics, events } from '@/utils/Analytics';
import { alert } from '@/utils/ErrorAlert';
import { PostDiaryNavigationProp } from './interfaces';
import { useCommon } from './useCommon';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { addAiCheckError, getLanguageTool } from '@/utils/grammarCheck';
import { insertImages } from '@/utils/storage';

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
    isImageLoading,
    isLoadingPublish,
    setIsLoadingPublish,
    isLoadingDraft,
    setIsLoadingDraft,
    isModalError,
    setIsModalError,
    title,
    text,
    images,
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
    onPressChooseImage,
    onPressCamera,
    onPressDeleteImage,
  } = useCommon({
    navigation,
    themeTitle,
    learnLanguage: user.learnLanguage,
  });

  const getDiary = useCallback(
    (
      uid: string,
      newTitle: string,
      newText: string,
      newImages: ImageInfo[] | null,
      diaryStatus: DiaryStatus,
      languageTool?: LanguageTool,
    ): Diary => {
      return {
        uid: uid,
        title: newTitle,
        text: newText,
        images: newImages,
        themeCategory: themeCategory || null,
        themeSubcategory: themeSubcategory || null,
        diaryStatus,
        longCode: selectedItem.value as LongCode,
        ...(languageTool ? { languageTool } : {}),
        createdAt:
          firestore.FieldValue.serverTimestamp() as FirebaseFirestoreTypes.Timestamp,
        updatedAt:
          firestore.FieldValue.serverTimestamp() as FirebaseFirestoreTypes.Timestamp,
      };
    },
    [themeCategory, themeSubcategory, selectedItem.value],
  );

  const onPressDraft = useCallback(async (): Promise<void> => {
    Keyboard.dismiss();
    if (isLoadingDraft || isLoadingPublish) return;
    logAnalytics('on_press_draft_post');

    const isTitleSkip = !!themeCategory && !!themeSubcategory;
    setIsLoadingDraft(true);

    try {
      const diaryRef = firestore().collection('diaries').doc();
      const diaryId = diaryRef.id;
      const { newTitle, newText } = getTitleTextPrettier(
        isTitleSkip,
        title,
        text,
      );
      const newImages = await insertImages(user.uid, diaryId, images);
      const diary = getDiary(user.uid, newTitle, newText, newImages, 'draft');
      await diaryRef.set(diary);

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
    images,
    isLoadingDraft,
    isLoadingPublish,
    navigation,
    setIsLoadingDraft,
    text,
    themeCategory,
    themeSubcategory,
    title,
    user.uid,
  ]);

  const onPressCheck = useCallback(async (): Promise<void> => {
    Keyboard.dismiss();
    if (isLoadingDraft || isLoadingPublish) return;
    logAnalytics('on_press_check_post');

    const isTitleSkip = !!themeCategory && !!themeSubcategory;

    const checked = checkBeforePost(isTitleSkip, title, text);
    if (!checked.result) {
      setErrorMessage(checked.errorMessage);
      setIsModalError(true);
      return;
    }

    setIsLoadingPublish(true);
    const diaryRef = firestore().collection('diaries').doc();
    const diaryId = diaryRef.id;
    let themeDiaries = user.themeDiaries || null;
    const { newTitle, newText } = getTitleTextPrettier(
      isTitleSkip,
      title,
      text,
    );
    const newImages = await insertImages(user.uid, diaryId, images);

    const languageTool = await getLanguageTool(
      selectedItem.value as LongCode,
      isTitleSkip,
      newTitle,
      newText,
    );

    const diary = getDiary(
      user.uid,
      newTitle,
      newText,
      newImages,
      'checked',
      languageTool,
    );
    const { runningDays, runningWeeks } = getRunning(user);

    // 日記の更新の整合性をとるためtransactionを使う
    await firestore()
      .runTransaction(async (transaction) => {
        // diariesの更新
        transaction.set(diaryRef, diary);
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

    if (
      languageTool?.titleResult === 'error' ||
      languageTool?.textResult === 'error'
    ) {
      // // ログを出す
      await addAiCheckError(
        'LanguageTool',
        'original',
        'usePostDiary',
        user.uid,
        diaryId,
      );
    }

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
    images,
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
    isImageLoading,
    title,
    text,
    images,
    errorMessage,
    selectedItem,
    onPressCheck,
    onPressCloseModalCancel,
    onChangeTextTitle,
    onChangeTextText,
    onPressChooseImage,
    onPressCamera,
    onPressDeleteImage,
    onPressDraft,
    onPressNotSave,
    onPressClose,
    onPressCloseError,
    onPressItem,
  };
};
