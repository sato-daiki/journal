import { getAnalytics, logEvent } from 'firebase/analytics';

export const logAnalytics = async (eventName: string) => {
  console.log(eventName);
  // const analytics = getAnalytics();
  // logEvent(analytics, eventName);
};

export { default as events } from './events';
