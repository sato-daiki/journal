import * as React from 'react';
import { useCallback, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const styles = StyleSheet.create({
  adMobBanner: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

const IOS_AD_UNIT_ID = 'ca-app-pub-0770181536572634/6920458887';
const ANDROID_AD_UNIT_ID = 'ca-app-pub-0770181536572634/3456405335';

const BottomBanner: React.FC = () => {
  const [loadingAdmobError, setLoadingAdmobError] = useState(false);

  const onErrorLoadingAdMob = useCallback(() => {
    setLoadingAdmobError(true);
  }, []);

  const renderAds = useCallback(() => {
    if (!loadingAdmobError) {
      return (
        <View style={styles.adMobBanner}>
          <BannerAd
            unitId={Platform.OS === 'ios' ? IOS_AD_UNIT_ID : ANDROID_AD_UNIT_ID}
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
  }, [loadingAdmobError, onErrorLoadingAdMob]);

  return <View>{renderAds()}</View>;
};

export default BottomBanner;
