import { LocalStatus, User } from '@/types';
import { State } from '@/types/state';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
  adMobBanner: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

const unitId =
  Platform.OS === 'ios'
    ? process.env.IOS_AD_UNIT_ID!
    : process.env.ANDROID_AD_UNIT_ID!;

const BottomBanner: React.FC = () => {
  const { localStatus } = useSelector((state: State) => state.rootReducer);

  const [loadingAdmobError, setLoadingAdmobError] = useState(false);

  const onErrorLoadingAdMob = useCallback(() => {
    setLoadingAdmobError(true);
  }, []);

  const renderAds = useCallback(() => {
    if (!loadingAdmobError && !localStatus.isPremium) {
      return (
        <View style={styles.adMobBanner}>
          <BannerAd
            unitId={unitId}
            size={BannerAdSize.BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
            onAdFailedToLoad={onErrorLoadingAdMob}
          />
        </View>
      );
    }

    return null;
  }, [loadingAdmobError, localStatus.isPremium, onErrorLoadingAdMob]);

  return <View>{renderAds()}</View>;
};

export default BottomBanner;
