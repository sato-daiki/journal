// import * as Analytics from 'expo-firebase-analytics';

export const logAnalytics = async (eventName: string) => {
  console.log(eventName);
  // await Analytics.logEvent(eventName);
};

export { default as events } from './events';
