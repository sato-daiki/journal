import { useCallback, useState, useEffect, useRef } from 'react';
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

const IOS_AD_REWARD = 'ca-app-pub-0770181536572634/6050230343';
const ANDROID_AD_REWARD = 'ca-app-pub-0770181536572634/2143323663';

const adUnitId = Platform.OS === 'ios' ? IOS_AD_REWARD : ANDROID_AD_REWARD;
const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

export const useAdMobRewarded = ({ handleDidEarnReward }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const loaded = useRef<boolean>(false);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setIsLoading(false);
        loaded.current = true;
        showAdReward();
      },
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => {
        // 獲得後
        handleDidEarnReward();
      },
    );

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAdReward = useCallback(async () => {
    setIsLoading(true);
    loaded.current = false;

    rewarded.load();
    setTimeout(() => {
      setIsLoading(false);
      // if (loaded.current === false) {
      //   commonAlert({
      //     title: I18n.t('common.error'),
      //     message: I18n.t('errorMessage.video'),
      //     options: { cancelable: false },
      //   });
      // }
    }, 6000);
  }, []);

  const showAdReward = useCallback(async () => {
    try {
      await rewarded.show();
    } catch (err: any) {
      commonAlert({
        title: I18n.t('common.error'),
        message: I18n.t('errorMessage.video'),
        options: { cancelable: false },
      });
    }
  }, []);

  return {
    isLoading,
    loadAdReward,
  };
};
