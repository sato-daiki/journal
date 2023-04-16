import { Alert, AlertButton, AlertOptions, Platform } from 'react-native';

interface CommonAlertProps {
  title: string;
  message: string;
  buttons?: AlertButton[];
  options?: AlertOptions;
}

export const commonAlert = ({
  title,
  message,
  buttons,
  options,
}: CommonAlertProps): void => {
  if (Platform.OS !== 'web') {
    Alert.alert(title, message, buttons, options);
  }
};
