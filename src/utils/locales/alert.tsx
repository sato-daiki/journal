import { Alert, AlertButton, AlertOptions } from 'react-native';

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
  Alert.alert(title, message, buttons, options);
};
