import { Alert, Platform } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { SERVICE_NAME } from '../constants';
import I18n from './I18n';
import { uploadStorageAsync } from './storage';

const openAlert = (): void => {
  Alert.alert(
    I18n.t('cameraRoll.permitTitle'),
    I18n.t('cameraRoll.permitMessage', {
      name: SERVICE_NAME,
    }),
    [{ text: 'OK' }],
    { cancelable: false }
  );
};

export const uploadImageAsync = async (
  photoUrl: string,
  path: string,
  width = 300
): Promise<string> => {
  const ret = await ImageManipulator.manipulateAsync(photoUrl, [
    { resize: { width } },
  ]);
  const url = await uploadStorageAsync(path, ret.uri);
  return url;
};

export async function openCameraRoll(
  options = {}
): Promise<ImagePicker.ImagePickerResult> {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      openAlert();
      return { cancelled: true };
    }
  }

  const result = await ImagePicker.launchImageLibraryAsync(options);
  return result;
}
