import { ReminderSelectTimeProps } from '@/components/organisms/ReminderSelectTime/ReminderSelectTime';
import { CustomTimeInfo, FixDay, FixTimeInfo } from '@/types';

export type DefaultInfo = Pick<
  ReminderSelectTimeProps,
  | 'defaultReminderType'
  | 'defaultNotificationStart'
  | 'defaultNotificationEnd'
  | 'defaultFixDays'
  | 'defaultFixTimeInfo'
  | 'defaultCuctomTimeInfos'
>;

export const initFixDays: FixDay[] = [...Array(7)].map((_, i) => {
  return {
    day: i,
    checked: true,
  };
});

export const initFixTimeInfo: FixTimeInfo = {
  timeStart: new Date(2000, 1, 1, 20, 0, 0),
  timeEnd: new Date(2000, 1, 1, 21, 0, 0),
  isFocus: false,
};

export const initCuctomTimeInfos: CustomTimeInfo[] = [...Array(7)].map(
  (_, i) => {
    return {
      day: i,
      checked: true,
      timeStart: new Date(2000, 1, 1, 20, 0, 0),
      timeEnd: new Date(2000, 1, 1, 21, 0, 0),
      isFocus: false,
    };
  }
);
