import analytics from '@react-native-firebase/analytics';

export const logAnalytics = async (eventName: string) => {
  console.log(eventName);
  analytics().logEvent(eventName);
};

export { default as events } from './events';
