import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { State } from '@/types/state';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { useSelector } from 'react-redux';

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
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
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

const styles = StyleSheet.create({
  adMobBanner: {
    alignItems: 'center',
  },
});

export default BottomBanner;
