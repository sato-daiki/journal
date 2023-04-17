import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import mobileAds from 'react-native-google-mobile-ads';

import { LocalStatus } from '@/types';
import { setPushotifications } from '@/utils/Notification';

interface Props {
  localStatus: LocalStatus;
  onResponseReceived: () => void;
}

/*
 * 一番最初の画面で行う処理一覧
 */
export const useFirstScreen = ({
  localStatus,
  onResponseReceived,
}: Props): void => {
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  // 初期データの取得
  useEffect(() => {
    const f = async (): Promise<void> => {
      console.log('initialize');
      await mobileAds().initialize();

      console.log('useFirstScreen', localStatus.firstLogin, localStatus.uid);
      // 初回登録でskipした場合は入らないようにする
      if (!localStatus.firstLogin && localStatus.uid) {
        setPushotifications(localStatus.uid);
      }
    };
    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    // notificationListener.current = Notifications.addNotificationReceivedListener(
    //   prm => {
    //     console.log('[usePushNotification] catched notification', prm);
    //     onRefresh();
    //   }
    // );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('[usePushNotification] catched notificationRes');
        onResponseReceived();
      });

    return (): void => {
      // if (notificationListener.current) {
      //   Notifications.removeNotificationSubscription(
      //     notificationListener.current
      //   );
      // }

      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
