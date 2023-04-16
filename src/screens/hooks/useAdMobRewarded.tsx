import { useCallback, useState, useEffect } from 'react';
import {
  RewardedAd,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';

import { Platform } from 'react-native';
import { commonAlert } from '@/utils/locales/alert';
import I18n from '@/utils/I18n';

type Props = {
  handleDidEarnReward: () => Promise<void>;
};

const IOS_AD_UNIT_ID = 'ca-app-pub-0770181536572634/6050230343';
const ANDROID_AD_UNIT_ID = 'ca-app-pub-0770181536572634/2143323663';

export const useAdMobRewarded = ({ handleDidEarnReward }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // if (Platform.OS === 'web') return;
    // const f = async () => {
    //   AdMobRewarded.addEventListener(
    //     'rewardedVideoUserDidEarnReward',
    //     rewardedVideoUserDidEarnReward,
    //   );
    //   AdMobRewarded.addEventListener(
    //     'rewardedVideoDidFailToLoad',
    //     rewardedVideoDidFailToLoad,
    //   );
    // };
    // f();
    // return (): void => {
    //   AdMobRewarded.removeAllListeners();
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rewardedVideoUserDidEarnReward = useCallback(async () => {
    console.log('rewardedVideoUserDidEarnReward');
    // 広告をみた人が実行できる処理
    handleDidEarnReward();
  }, [handleDidEarnReward]);

  const rewardedVideoDidFailToLoad = useCallback(() => {
    // commonAlert({
    //   title: I18n.t('common.error'),
    //   message: I18n.t('errorMessage.video'),
    //   options: { cancelable: false },
    // });
  }, []);

  const showAdReward = useCallback(async () => {
    // setIsLoading(true);
    // try {
    //   await setTestDeviceIDAsync('EMULATOR');
    //   await AdMobRewarded.setAdUnitID(
    //     Platform.OS === 'ios' ? IOS_AD_UNIT_ID : ANDROID_AD_UNIT_ID,
    //   );
    //   await AdMobRewarded.requestAdAsync();
    //   await AdMobRewarded.showAdAsync();
    // } catch (err: any) {
    //   console.warn(err);
    //   rewardedVideoDidFailToLoad();
    // }
    // setIsLoading(false);
  }, [rewardedVideoDidFailToLoad]);

  return {
    isLoading,
    showAdReward,
  };
};
