import { useCallback, useEffect, useState } from 'react';
import { BackHandler, Alert, Keyboard } from 'react-native';
import I18n from '@/utils/I18n';
import { LongCode } from '@/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { getLanguageToolShortName } from '@/utils/grammarCheck';
import { PickerItem } from '@/components/molecules/ModalPicker';

interface UseCommon {
  navigation: StackNavigationProp<any>;
  themeTitle?: string;
  learnLanguage: LongCode;
}

export const useCommon = ({
  navigation,
  themeTitle,
  learnLanguage,
}: UseCommon) => {
  const [isLoadingPublish, setIsLoadingPublish] = useState(false);
  const [isLoadingDraft, setIsLoadingDraft] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isModalError, setIsModalError] = useState(false);

  const [title, setTitle] = useState(themeTitle || '');
  const [text, setText] = useState('');
  const [selectedItem, setSelectedItem] = useState<PickerItem>({
    label: getLanguageToolShortName(learnLanguage),
    value: learnLanguage,
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // keyboardでの戻るを制御する Androidのみ
    const backAction = (): boolean => {
      Alert.alert(
        I18n.t('common.confirmation'),
        I18n.t('modalDiaryCancel.message'),
        [
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
        ],
      );
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return (): void =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [navigation]);

  const onPressItem = useCallback((item: PickerItem) => {
    setSelectedItem(item);
  }, []);

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

  const onPressCloseModalCancel = useCallback(() => {
    setIsModalCancel(false);
  }, []);

  const onPressNotSave = useCallback((): void => {
    setIsModalCancel(false);
    navigation.navigate('Home', {
      screen: 'MyDiaryTab',
      params: { screen: 'MyDiaryList' },
    });
  }, [navigation]);

  const onPressCloseError = useCallback((): void => {
    setErrorMessage('');
    setIsModalError(false);
  }, []);

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
  };
};
