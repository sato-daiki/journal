import analytics from '@react-native-firebase/analytics';

export const logAnalytics = async (eventName: string) => {
  console.log(eventName);
  if (!__DEV__) {
    analytics().logEvent(eventName);
  }
};

export { default as events } from './events';
