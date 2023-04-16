import { Alert, Platform } from 'react-native';
import { captureException } from '@/utils/sentry';

import I18n from './I18n';

interface ErrorAlert {
  err: Error & { code?: string };
  onPressOk?: () => void;
}

export const alert = ({ err, onPressOk }: ErrorAlert): void => {
  let { message } = err;

  if (err.code) {
    // firebase系のエラー
    switch (err.code) {
      case 'auth/network-request-failed':
        message = I18n.t('errorMessage.network');
        break;
      case 'auth/too-many-requests':
        message = I18n.t('errorMessage.tooManyRequests');
        break;
      default:
        message = I18n.t('errorMessage.defaultError', { message });
        break;
    }
  } else {
    message = I18n.t('errorMessage.defaultError', { message });
  }
  if (Platform.OS === 'web') {
    const res = window.confirm(`${I18n.t('common.error')}\n${message}`);
    if (res && onPressOk) onPressOk();
  } else {
    Alert.alert(I18n.t('common.error'), message, [
      {
        text: 'OK',
        onPress: onPressOk,
      },
    ]);
  }

  captureException(err);
};
