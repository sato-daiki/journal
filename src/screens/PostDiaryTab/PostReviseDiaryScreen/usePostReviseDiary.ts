import { useState, useCallback, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { User, Diary, LongCode, LanguageTool } from '@/types';
import { checkBeforePost } from '@/utils/diary';
import { useCommon } from '../PostDiaryScreen/useCommont';
import firestore from '@react-native-firebase/firestore';
import { getAiCheck } from '@/utils/grammarCheck';
import { Sapling } from '@/types/sapling';
import { PostReviseDiaryNavigationProp } from './PostReviseDiaryScreen';

interface UsePostReviseDiary {
  user: User;
  editDiary: (objectID: string, diary: Diary) => void;
  navigation: PostReviseDiaryNavigationProp;
  item: Diary;
}

export const usePostReviseDiary = ({
  navigation,
  item,
  user,
  editDiary,
}: UsePostReviseDiary) => {
  const [isInitialLoading, setIsInitialLoading] = useState(false);

  const {
    isModalCancel,
    isLoadingPublish,
    setIsLoadingPublish,
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
    onChangeTextTitle,
    onChangeTextText,
  } = useCommon({
    navigation,
    learnLanguage: user.learnLanguage,
  });

  useEffect(() => {
    if (item) {
      onChangeTextTitle(item.reviseTitle || item.title);
      onChangeTextText(item.reviseText || item.text);
    }
    setIsInitialLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDiary = useCallback(
    (languageTool?: LanguageTool, sapling?: Sapling) => {
      return {
        reviseTitle: title,
        reviseText: text,
        reviseLanguageTool: languageTool || null,
        reviseSapling: sapling || null,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };
    },
    [title, text],
  );

  const onPressCheck = useCallback(async (): Promise<void> => {
    Keyboard.dismiss();
    if (isInitialLoading || isLoadingPublish) return;
    if (!item.objectID) return;
    const isTitleSkip = !!item.themeCategory && !!item.themeSubcategory;

    const checked = checkBeforePost(isTitleSkip, title, text);
    if (!checked.result) {
      setErrorMessage(checked.errorMessage);
      setIsModalError(true);
      return;
    }
    if (!item || !item.objectID) return;

    setIsLoadingPublish(true);

    const { languageTool, sapling } = await getAiCheck(
      selectedItem.value as LongCode,
      isTitleSkip,
      title,
      text,
    );

    const diary = getDiary(languageTool, sapling);
    await firestore().doc(`diaries/${item.objectID}`).update(diary);

    // reduxを更新
    editDiary(item.objectID, {
      ...item,
      ...diary,
      updatedAt: firestore.FieldValue.serverTimestamp(),
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
    isLoadingPublish,
    item,
    navigation,
    selectedItem.value,
    setErrorMessage,
    setIsLoadingPublish,
    setIsModalError,
    text,
    title,
  ]);

  const onPressMyDiary = useCallback(() => {
    if (!item.objectID) return;
    navigation.push('ModalViewMyDiary', {
      screen: 'ViewMyDiary',
      params: {
        objectID: item.objectID,
      },
    });
  }, [item.objectID, navigation]);

  return {
    isInitialLoading,
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
    onPressNotSave,
    onPressClose,
    onPressCloseError,
    onPressMyDiary,
  };
};
