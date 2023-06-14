import { useState, useCallback, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { User, Diary, LongCode, LanguageTool } from '@/types';
import { checkBeforePost, getTitleTextPrettier } from '@/utils/diary';
import { useCommon } from '../PostDiaryScreen/useCommont';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { PostReviseDiaryNavigationProp } from './PostReviseDiaryScreen';
import { addAiCheckError, getLanguageTool } from '@/utils/grammarCheck';
import { logAnalytics } from '@/utils/Analytics';

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
    (newTitle: string, newText: string, languageTool?: LanguageTool) => {
      return {
        reviseTitle: newTitle,
        reviseText: newText,
        ...(languageTool ? { reviseLanguageTool: languageTool } : {}),
        reviseSapling: null,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };
    },
    [],
  );

  const onPressCheck = useCallback(async (): Promise<void> => {
    Keyboard.dismiss();
    if (isInitialLoading || isLoadingPublish) return;
    logAnalytics('on_press_check_revise');

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
    const { newTitle, newText } = getTitleTextPrettier(
      isTitleSkip,
      title,
      text,
    );

    const languageTool = await getLanguageTool(
      selectedItem.value as LongCode,
      isTitleSkip,
      newTitle,
      newText,
    );

    const diary = getDiary(newTitle, newText, languageTool);
    await firestore().doc(`diaries/${item.objectID}`).update(diary);

    // reduxを更新
    editDiary(item.objectID, {
      ...item,
      ...diary,
      updatedAt:
        firestore.FieldValue.serverTimestamp() as FirebaseFirestoreTypes.Timestamp,
    });

    setIsLoadingPublish(false);
    if (
      languageTool?.titleResult === 'error' ||
      languageTool?.textResult === 'error'
    ) {
      // ログを出す
      await addAiCheckError(
        'LanguageTool',
        'revised',
        'usePostReviseDiary',
        user.uid,
        item.objectID,
      );
    }
    navigation.navigate('Home', {
      screen: 'MyDiaryTab',
      params: {
        screen: 'MyDiary',
        //@ts-ignore
        params: { objectID: item.objectID, caller: 'PostReviseDiary' },
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
    user.uid,
  ]);

  const onPressMyDiary = useCallback(() => {
    if (!item.objectID) return;
    navigation.navigate('ModalViewMyDiary', {
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
