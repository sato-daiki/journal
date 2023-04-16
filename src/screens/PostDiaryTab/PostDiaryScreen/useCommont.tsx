import { useCallback, useEffect, useState } from 'react';
import { BackHandler, Alert, Keyboard } from 'react-native';
import I18n from '@/utils/I18n';
import { checkBeforePost } from '@/utils/diary';
import { Language } from '@/types';
import { StackNavigationProp } from '@react-navigation/stack';

interface UseCommon {
  navigation: StackNavigationProp<any>;
  themeTitle?: string;
  points: number;
  learnLanguage: Language;
}

export const useCommon = ({ navigation, themeTitle, points, learnLanguage }: UseCommon) => {
  const [isLoadingPublish, setIsLoadingPublish] = useState(false);
  const [isLoadingDraft, setIsLoadingDraft] = useState(false);
  const [isModalAlert, setIsModalAlert] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isModalLack, setIsModalLack] = useState(points < 10);
  const [isModalError, setIsModalError] = useState(false);
  // ポイントが足りない時アラートをだす
  const [isPublish, setIsPublish] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [title, setTitle] = useState(themeTitle || '');
  const [text, setText] = useState('');
  const [publishMessage, setPublishMessage] = useState<string | null>(null);

  useEffect(() => {
    // keybordでの戻るを制御する Androidのみ
    const backAction = (): boolean => {
      Alert.alert(I18n.t('common.confirmation'), I18n.t('modalDiaryCancel.message'), [
        {
          text: I18n.t('common.cancel'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (): void => {
            navigation.navigate('Home', {
              screen: 'MyDiaryTab',
              params: { screen: 'MyDiaryList' },
            });
          },
        },
      ]);
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return (): void => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [navigation]);

  const onPressPublic = useCallback((): void => {
    Keyboard.dismiss();
    const checked = checkBeforePost(title, text, points, learnLanguage);
    if (!checked.result) {
      setErrorMessage(checked.errorMessage);
      setIsModalError(true);
      return;
    }
    setIsModalAlert(true);
  }, [learnLanguage, text, title, points]);

  const onPressClose = useCallback((): void => {
    Keyboard.dismiss();
    if (title.length > 0 || text.length > 0) {
      setIsModalCancel(true);
    } else {
      navigation.navigate('Home', {
        screen: 'MyDiaryTab',
        params: { screen: 'MyDiaryList' },
      });
    }
  }, [navigation, text.length, title.length]);

  const onPressCloseError = useCallback((): void => {
    setErrorMessage('');
    setIsModalError(false);
  }, []);

  const onPressCloseModalPublish = useCallback(() => {
    setIsModalAlert(false);
  }, []);

  const onPressCloseModalCancel = useCallback(() => {
    setIsModalCancel(false);
  }, []);

  const onPressSubmitModalLack = useCallback(() => {
    setIsModalLack(false);
  }, []);

  const onClosePostDiary = useCallback((): void => {
    navigation.navigate('Home', {
      screen: 'MyDiaryTab',
      params: { screen: 'MyDiaryList' },
    });
    setIsModalAlert(false);
    setIsPublish(false);
  }, [navigation]);

  const onPressNotSave = useCallback((): void => {
    setIsModalCancel(false);
    navigation.navigate('Home', {
      screen: 'MyDiaryTab',
      params: { screen: 'MyDiaryList' },
    });
  }, [navigation]);

  const onPressCloseModalLack = useCallback(() => {
    navigation.navigate('Home', {
      screen: 'TeachDiaryTab',
      params: { screen: 'TeachDiaryList' },
    });
  }, [navigation]);

  const onPressWatchAdModalLack = useCallback(() => {
    setIsModalLack(false);
    navigation.navigate('Home', {
      screen: 'MyPageTab',
      params: { screen: 'MyPage' },
    });
  }, [navigation]);

  return {
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
  };
};
