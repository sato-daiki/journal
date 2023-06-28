import { useCallback, useEffect, useState } from 'react';
import { BackHandler, Alert, Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import I18n from '@/utils/I18n';
import { ImageInfo, LongCode } from '@/types';
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
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [selectedItem, setSelectedItem] = useState<PickerItem>({
    label: getLanguageToolShortName(learnLanguage),
    value: learnLanguage,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(false);

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
    (value) => {
      setTitle(value);
    },
    [setTitle],
  );

  const onChangeTextText = useCallback(
    (value) => {
      setText(value);
    },
    [setText],
  );

  const onChangeImages = useCallback((value) => {
    setImages(value);
  }, []);

  const onPressChooseImage = useCallback(async () => {
    try {
      // すぐIsImageLoadingをtureにすると立ち上がり前にくるくるするため
      setTimeout(() => {
        setIsImageLoading(true);
      }, 500);
      // No permissions request is necessary for launching the image library

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
      if (!result.canceled) {
        const newImageUrls = [
          ...images,
          {
            imageUrl: result.assets[0].uri,
            imagePath: null,
          },
        ];
        setImages(newImageUrls);
      }
    } catch (err: any) {
      Alert.alert(I18n.t('common.error'), err.message);
    } finally {
      setIsImageLoading(false);
    }
  }, [images]);

  const onPressCamera = useCallback(async () => {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          I18n.t('postDiary.errorPermissionTitle'),
          I18n.t('postDiary.errorPermissionText'),
        );
        return;
      }
      setTimeout(() => {
        setIsImageLoading(true);
      }, 500);
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.canceled) {
        const newImageUrls = [
          ...images,
          {
            imageUrl: result.assets[0].uri,
            imagePath: null,
          },
        ];
        setImages(newImageUrls);
      }
    } catch (err: any) {
      Alert.alert(I18n.t('common.error'), err.message);
    } finally {
      setIsImageLoading(false);
    }
  }, [images]);

  const onPressImage = useCallback(
    async (index: number) => {
      navigation.navigate('ModalImageList', {
        screen: 'ImageList',
        params: {
          defaultIndex: index,
          images: images,
        },
      });
    },
    [images, navigation],
  );

  const onPressDeleteImage = useCallback(
    async (paramImage: ImageInfo) => {
      const newImages = images.filter((image) => image !== paramImage);
      setImages(newImages);
    },
    [images],
  );

  return {
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
  };
};
