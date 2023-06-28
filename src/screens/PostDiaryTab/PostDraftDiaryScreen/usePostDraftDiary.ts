import { useState, useCallback, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { logAnalytics, events } from '@/utils/Analytics';
import {
  DiaryStatus,
  User,
  Diary,
  LongCode,
  LanguageTool,
  ImageInfo,
} from '@/types';
import {
  checkBeforePost,
  getRunning,
  getThemeDiaries,
  getTitleTextPrettier,
} from '@/utils/diary';
import { alert } from '@/utils/ErrorAlert';
import { PostDraftDiaryNavigationProp } from './interfaces';
import { useCommon } from '../PostDiaryScreen/useCommon';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {
  addAiCheckError,
  getLanguageTool,
  getLanguageToolShortName,
} from '@/utils/grammarCheck';
import { updateImages } from '@/utils/storage';

interface UsePostDraftDiary {
  user: User;
  item: Diary;
  setUser: (user: User) => void;
  editDiary: (objectID: string, diary: Diary) => void;
  navigation: PostDraftDiaryNavigationProp;
}

export const usePostDraftDiary = ({
  navigation,
  item,
  user,
  setUser,
  editDiary,
}: UsePostDraftDiary) => {
  const [isInitialLoading, setIsInitialLoading] = useState(false);

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
    onChangeImages,
    onPressChooseImage,
    onPressCamera,
    onPressImage,
    onPressDeleteImage,
  } = useCommon({
    navigation,
    learnLanguage: user.learnLanguage,
  });

  useEffect(() => {
    onChangeTextTitle(item.title);
    onChangeTextText(item.text);
    if (item.images) {
      onChangeImages(item.images);
    }

    onPressItem({
      label: getLanguageToolShortName(item.longCode),
      value: item.longCode,
    });

    setIsInitialLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDiary = useCallback(
    (
      diaryStatus: DiaryStatus,
      newTitle: string,
      newText: string,
      newImages: ImageInfo[] | null,
      languageTool?: LanguageTool,
    ) => {
      return {
        title: newTitle,
        text: newText,
        images: newImages,
        diaryStatus,
        longCode: selectedItem.value as LongCode,
        ...(languageTool ? { languageTool } : {}),
        updatedAt:
          firestore.FieldValue.serverTimestamp() as FirebaseFirestoreTypes.Timestamp,
      };
    },
    [selectedItem.value],
  );

  const onPressDraft = useCallback(async (): Promise<void> => {
    Keyboard.dismiss();
    if (isInitialLoading || isLoadingDraft || isLoadingPublish) return;
    logAnalytics('on_press_draft_draft');
    if (!item.objectID) return;

    const isTitleSkip = !!item.themeCategory && !!item.themeSubcategory;
    setIsLoadingDraft(true);

    try {
      const { newTitle, newText } = getTitleTextPrettier(
        isTitleSkip,
        title,
        text,
      );
      const newImages = await updateImages(
        user.uid,
        item.objectID,
        images,
        item.images,
      );

      const diary = getDiary('draft', newTitle, newText, newImages);

      const diaryRef = firestore().doc(`diaries/${item.objectID}`);
      await diaryRef.update(diary);

      // reduxを更新
      editDiary(item.objectID, {
        ...item,
        ...diary,
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
    editDiary,
    getDiary,
    images,
    isInitialLoading,
    isLoadingDraft,
    isLoadingPublish,
    item,
    navigation,
    setIsLoadingDraft,
    text,
    title,
    user.uid,
  ]);

  const onPressCheck = useCallback(async (): Promise<void> => {
    Keyboard.dismiss();
    if (isInitialLoading || isLoadingDraft || isLoadingPublish) return;
    logAnalytics('on_press_check_draft');

    if (!item.objectID) return;
    const isTitleSkip = !!item.themeCategory && !!item.themeSubcategory;

    const checked = checkBeforePost(isTitleSkip, title, text);
    if (!checked.result) {
      setErrorMessage(checked.errorMessage);
      setIsModalError(true);
      return;
    }

    setIsLoadingPublish(true);
    const { newTitle, newText } = getTitleTextPrettier(
      isTitleSkip,
      title,
      text,
    );
    const newImages = await updateImages(
      user.uid,
      item.objectID,
      images,
      item.images,
    );

    const languageTool = await getLanguageTool(
      selectedItem.value as LongCode,
      isTitleSkip,
      newTitle,
      newText,
    );

    const diary = getDiary(
      'checked',
      newTitle,
      newText,
      newImages,
      languageTool,
    );
    const { runningDays, runningWeeks } = getRunning(user);

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
        if (!item.objectID) return;
        const diaryRef = firestore().doc(`diaries/${item.objectID}`);
        await diaryRef.update(diary);

        // 初回の場合はdiaryPostedを更新する
        const userRef = firestore().doc(`users/${user.uid}`);
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
        transaction.update(userRef, updateUser);
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
      updatedAt:
        firestore.FieldValue.serverTimestamp() as FirebaseFirestoreTypes.Timestamp,
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
      // ログを出す
      await addAiCheckError(
        'LanguageTool',
        'original',
        'usePostDraftDiary',
        user.uid,
        item.objectID,
      );
    }
    navigation.navigate('Home', {
      screen: 'MyDiaryTab',
      params: {
        screen: 'MyDiary',
        // @ts-ignore
        params: { objectID: item.objectID, caller: 'PostDraftDiary' },
      },
    });
  }, [
    editDiary,
    getDiary,
    images,
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

  return {
    isInitialLoading,
    isLoadingPublish,
    isLoadingDraft,
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
    onPressImage,
    onPressDeleteImage,
    onPressDraft,
    onPressNotSave,
    onPressClose,
    onPressCloseError,
    onPressItem,
  };
};
