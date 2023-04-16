import { v4 as uuidv4 } from 'uuid';
import * as Random from 'expo-random';
import Constants from 'expo-constants';
import { Share, Platform } from 'react-native';
import * as Linking from 'expo-linking';
import * as Sharing from 'expo-sharing';
import I18n from './I18n';
import { alert } from './ErrorAlert';
import { Language } from '../types';
import { Timestamp } from '@firebase/firestore';
import { EmailAuthProvider, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '@/constants/firebase';

const url = 'https://interchao.app';

export const getUuid = async (): Promise<string> =>
  uuidv4({ random: await Random.getRandomBytesAsync(16) });

export const emailValidate = (email: string): boolean => {
  const expression =
    // eslint-disable-next-line no-useless-escape, no-control-regex
    /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  return !expression.test(String(email).toLowerCase());
};

export const emaillExistCheck = async (email: string): Promise<boolean> => {
  const providers = await fetchSignInMethodsForEmail(auth, email);
  if (
    providers.findIndex(
      (p) => p === EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
    ) !== -1
  ) {
    return true;
  }
  return false;
};

export const emailInputError = (
  err: Error & { code?: string },
  setErrorPassword: (message: string) => void,
  setErrorEmail: (message: string) => void,
  clearErrorMessage: () => void,
): void => {
  switch (err.code) {
    case 'auth/weak-password':
      setErrorPassword(I18n.t('errorMessage.weakPassword'));
      break;
    case 'auth/wrong-password':
      setErrorPassword(I18n.t('errorMessage.wrongPassword'));
      break;
    case 'auth/user-not-found':
      setErrorEmail(I18n.t('errorMessage.userNotFound'));
      break;
    case 'auth/invalid-email':
      setErrorEmail(I18n.t('errorMessage.invalidEmail'));
      break;
    case 'auth/email-already-in-use':
      setErrorEmail(I18n.t('errorMessage.emailAlreadyInUse'));
      break;
    default:
      alert({ err });
      clearErrorMessage();
  }
};

export const passwordInputError = (
  err: Error & { code?: string },
  setErrorCurrentPassword: (message: string) => void,
  setErrorNewPassword: (message: string) => void,
  clearErrorMessage: () => void,
): void => {
  switch (err.code) {
    case 'auth/weak-password':
      setErrorNewPassword(I18n.t('errorMessage.weakPassword'));
      break;
    case 'auth/wrong-password':
      setErrorCurrentPassword(I18n.t('errorMessage.wrongPassword'));
      break;
    default:
      alert({ err });
      clearErrorMessage();
  }
};

export const getIndexName = (): string => {
  return 'prd_diaries';
};

export const getVersionText = (): string => {
  let versionText = `version ${Constants.manifest?.version}`;
  const webRevision = Constants.manifest?.extra?.webRevision;
  const revision = Constants.manifest?.extra?.revision;

  if (Platform.OS === 'web') {
    if (webRevision > 0) {
      versionText = `${versionText} web-rev. ${webRevision}`;
    }
    if (__DEV__) {
      versionText = `${versionText} (web-development)`;
    }
  } else {
    if (revision > 0) {
      versionText = `${versionText} rev. ${revision}`;
    }
    if (__DEV__) {
      versionText = `${versionText} (development)`;
    }
  }

  return versionText;
};

export const diaryShare = async (
  nativeLanguage: Language,
  imageUrl: string,
): Promise<void> => {
  const shareUrl = encodeURI(url);
  const message = `#Interchao ${shareUrl}`;
  if (Platform.OS === 'ios') {
    Share.share({
      message,
      url: imageUrl,
    });
  } else {
    Sharing.shareAsync(imageUrl);
  }
};

export const appShare = async (nativeLanguage: Language): Promise<void> => {
  // androidは画像のシェアができない
  const shareUrl = encodeURI(url);

  const message = `#Interchao ${shareUrl}`;
  Share.share({
    message,
  });
};

export const twitterShare = async (nativeLanguage: Language): Promise<void> => {
  const shareMessage = encodeURI(url);
  Linking.openURL(
    `https://www.facebook.com/sharer/sharer.php?u=${shareMessage}`,
  );
};

export const facebookShare = async (
  nativeLanguage: Language,
): Promise<void> => {
  const shareMessage = encodeURI(url);
  Linking.canOpenURL('twitter://post')
    .then(() => {
      Linking.openURL(`twitter://post?message=${shareMessage}`)
        .then(() => undefined)
        .catch((): void => {
          Linking.openURL(`http://twitter.com/share?text=${shareMessage}`);
        });
    })
    .catch(() => undefined);
};

interface EachOS {
  ios: number | string | undefined;
  android: number | string | undefined;
  web: number | string | undefined;
  other?: number | string | undefined;
}

export const getEachOS = ({
  ios,
  android,
  web,
  other,
}: EachOS): number | string | undefined => {
  if (Platform.OS === 'ios') {
    return ios;
  }
  if (Platform.OS === 'android') {
    return android;
  }
  if (Platform.OS === 'web') {
    return web;
  }
  return other || ios;
};

// 何日前かをチェックする
export const getIsAfterDay = (targetAt: Timestamp, days: number): boolean => {
  try {
    const dt = new Date();
    dt.setDate(dt.getDate() - days);
    return targetAt.toDate() < dt;
  } catch (err: any) {
    return false;
  }
};

export const getDateToStrDay = (targetDay: Date): string => {
  return `${targetDay.getFullYear()}${
    targetDay.getMonth() + 1
  }${targetDay.getDate()}`;
};

export const getLastMonday = (targetDay: Date): string => {
  // dayは日曜日が0,土曜日が6
  const day = targetDay.getDay();
  if (day === 0) {
    // 日曜日の場合は
    targetDay.setDate(targetDay.getDate() - 7 - 6);
  } else if (day === 1) {
    // 月曜日の場合は
    targetDay.setDate(targetDay.getDate() - 7);
  } else {
    targetDay.setDate(targetDay.getDate() - 7 - day + 1);
  }

  return getDateToStrDay(targetDay);
};

export const getThisMonday = (targetDay: Date): string => {
  // dayは日曜日が0,土曜日が6
  const day = targetDay.getDay();
  if (day === 0) {
    // 日曜日の場合は
    targetDay.setDate(targetDay.getDate() - 6);
  } else if (day === 1) {
    // 月曜日の場合は
    targetDay.setDate(targetDay.getDate());
  } else {
    targetDay.setDate(targetDay.getDate() - day + 1);
  }
  return getDateToStrDay(targetDay);
};
