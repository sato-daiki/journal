import { useCallback, useState } from 'react';
import * as Notifications from 'expo-notifications';

import { Reminder, ReminderType, TimeInfo } from '@/types';
import { addDay } from '@/utils/time';
import I18n from '@/utils/I18n';
import { ReminderSelectTimeProps } from './ReminderSelectTime';
import { doc, serverTimestamp, updateDoc } from '@firebase/firestore';
import { db } from '@/constants/firebase';

type Props = Pick<
  ReminderSelectTimeProps,
  | 'defaultReminderType'
  | 'defaultNotificationStart'
  | 'defaultNotificationEnd'
  | 'defaultFixDays'
  | 'defaultFixTimeInfo'
  | 'defaultCuctomTimeInfos'
  | 'user'
  | 'setUser'
  | 'gotoReminderSelectDay'
  | 'afterSave'
>;

export const useReminderSelectTime = ({
  defaultReminderType,
  defaultNotificationStart,
  defaultNotificationEnd,
  defaultFixDays,
  defaultFixTimeInfo,
  defaultCuctomTimeInfos,
  user,
  setUser,
  gotoReminderSelectDay,
  afterSave,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [reminderType, setrRminderType] =
    useState<ReminderType>(defaultReminderType);
  const [notificationStart, setNotificationStart] = useState(
    defaultNotificationStart,
  );
  const [notificationEnd, setNotificationEnd] = useState(
    defaultNotificationEnd,
  );

  const [fixDays, setFixDays] = useState(defaultFixDays);
  const [fixTimeInfo, setFixTimeInfo] = useState(defaultFixTimeInfo);
  const [customTimeInfos, setCustomTimeInfos] = useState(
    defaultCuctomTimeInfos,
  );

  const scheduleNotificationAsync = useCallback(
    async (
      which: 'start' | 'end',
      weekday: number,
      hour: number,
      minute: number,
    ) => {
      console.log('which:', which);
      console.log('weekday:', weekday);
      console.log('hour:', hour);
      console.log('minute:', minute);

      let title;
      let body;

      if (which === 'start') {
        title = I18n.t('reminderSelectTime.notificationStartTitle');
        body = I18n.t('reminderSelectTime.notificationStartBody');
      } else {
        title = I18n.t('reminderSelectTime.notificationEndTitle');
        body = I18n.t('reminderSelectTime.notificationEndBody');
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
        },
        trigger: {
          // javascriptのweekdayは0-6 , expoは1-7のためplusする
          weekday: weekday + 1,
          hour,
          minute,
          repeats: true,
          channelId: 'new-emails',
        },
      });
    },
    [],
  );

  const setNotification = useCallback(async () => {
    // 過去のスケジュールを全て削除する
    await Notifications.cancelAllScheduledNotificationsAsync();

    // 通知設定しない場合はreturn
    if (!notificationStart && !notificationEnd) return;

    if (reminderType === 'fix') {
      const hourStart = fixTimeInfo.timeStart.getHours();
      const minuteStart = fixTimeInfo.timeStart.getMinutes();

      const hourEnd = fixTimeInfo.timeEnd.getHours();
      const minuteEnd = fixTimeInfo.timeEnd.getMinutes();

      await Promise.all(
        fixDays
          .filter((item) => item.checked)
          .map(async (item) => {
            if (notificationStart) {
              await scheduleNotificationAsync(
                'start',
                item.day,
                hourStart,
                minuteStart,
              );
            }

            if (notificationEnd) {
              await scheduleNotificationAsync(
                'end',
                item.day,
                hourEnd,
                minuteEnd,
              );
            }
          }),
      );
    } else {
      await Promise.all(
        customTimeInfos
          .filter((item) => item.checked)
          .map(async (item) => {
            const hourStart = item.timeStart.getHours();
            const minuteStart = item.timeStart.getMinutes();

            const hourEnd = item.timeEnd.getHours();
            const minuteEnd = item.timeEnd.getMinutes();

            if (notificationStart) {
              await scheduleNotificationAsync(
                'start',
                item.day,
                hourStart,
                minuteStart,
              );
            }
            if (notificationEnd) {
              await scheduleNotificationAsync(
                'end',
                item.day,
                hourEnd,
                minuteEnd,
              );
            }
          }),
      );
    }
  }, [
    customTimeInfos,
    fixDays,
    fixTimeInfo.timeEnd,
    fixTimeInfo.timeStart,
    notificationEnd,
    notificationStart,
    reminderType,
    scheduleNotificationAsync,
  ]);

  const onPressDone = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    let timeInfo: TimeInfo;

    if (reminderType === 'fix') {
      timeInfo = {
        reminderType: 'fix',
        fixDays,
        fixTimeInfo,
      };
    } else {
      timeInfo = {
        reminderType: 'custom',
        customTimeInfos,
      };
    }

    const reminder: Reminder = {
      notificationStart,
      notificationEnd,
      timeInfo,
    };

    console.log('reminder', timeInfo);
    await updateDoc(doc(db, 'users', user.uid), {
      reminder,
      updatedAt: serverTimestamp(),
    });

    // スケジュールの登録
    await setNotification();

    setUser({
      ...user,
      reminder,
    });

    setIsLoading(false);
    afterSave();
  }, [
    afterSave,
    customTimeInfos,
    fixDays,
    fixTimeInfo,
    isLoading,
    notificationEnd,
    notificationStart,
    reminderType,
    setNotification,
    setUser,
    user,
  ]);

  const onPressFix = useCallback(() => {
    setrRminderType('fix');
  }, []);

  const onPressCustom = useCallback(() => {
    setrRminderType('custom');
  }, []);

  const onPressFixStudyDay = useCallback(() => {
    gotoReminderSelectDay({
      checkedDays: fixDays,
      onChangeCheckedDays: setFixDays,
    });
  }, [fixDays, gotoReminderSelectDay]);

  const handleFixTimeStart = useCallback(
    (_day: number | undefined, time: Date) => {
      setFixTimeInfo({
        ...fixTimeInfo,
        timeStart: time,
        timeEnd: !fixTimeInfo.isFocus
          ? addDay(time, 1, 'h')
          : fixTimeInfo.timeEnd,
        isFocus: true,
      });
    },
    [fixTimeInfo],
  );

  const handleFixTimeEnd = useCallback(
    (_day: number | undefined, time: Date) => {
      setFixTimeInfo({
        ...fixTimeInfo,
        timeEnd: time,
        isFocus: true,
      });
    },
    [fixTimeInfo],
  );

  const onPressCustomStudyDay = useCallback(() => {
    gotoReminderSelectDay({
      checkedDays: customTimeInfos,
      onChangeCheckedDays: setCustomTimeInfos,
    });
  }, [customTimeInfos, gotoReminderSelectDay]);

  const handleCumtomTimeStart = useCallback(
    (day: number | undefined, time: Date) => {
      const newCustomTimeInfos = customTimeInfos.map((item) => {
        if (item.day !== day) {
          return item;
        }
        const timeEnd = !item.isFocus ? addDay(time, 1, 'h') : item.timeEnd;
        return {
          ...item,
          timeStart: time,
          timeEnd,
          isFocus: true,
        };
      });
      setCustomTimeInfos(newCustomTimeInfos);
    },
    [customTimeInfos],
  );

  const handleCumtomTimeEnd = useCallback(
    (day: number | undefined, time: Date) => {
      const newCustomTimes = customTimeInfos.map((item) => {
        if (item.day !== day) {
          return item;
        }
        return {
          ...item,
          timeEnd: time,
          isFocus: true,
        };
      });
      setCustomTimeInfos(newCustomTimes);
    },
    [customTimeInfos],
  );

  const onPressNotificationStart = useCallback(() => {
    setNotificationStart(!notificationStart);
  }, [notificationStart]);

  const onPressNotificationEnd = useCallback(() => {
    setNotificationEnd(!notificationEnd);
  }, [notificationEnd]);

  return {
    isLoading,
    notificationStart,
    notificationEnd,
    reminderType,
    fixDays,
    fixTimeInfo,
    customTimeInfos,
    handleFixTimeStart,
    handleFixTimeEnd,
    handleCumtomTimeStart,
    handleCumtomTimeEnd,
    onPressDone,
    onPressFix,
    onPressCustom,
    onPressCustomStudyDay,
    onPressFixStudyDay,
    onPressNotificationStart,
    onPressNotificationEnd,
  };
};
