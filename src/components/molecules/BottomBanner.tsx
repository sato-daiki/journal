import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
// import {
//   AdMobBanner,
//   setTestDeviceIDAsync,
//   requestPermissionsAsync,
// } from 'expo-ads-admob';

const styles = StyleSheet.create({
  adMobBanner: {
    alignItems: 'center',
  },
});

const IOS_AD_UNIT_ID = 'ca-app-pub-0770181536572634/3644229404';
const ANDROID_AD_UNIT_ID = 'ca-app-pub-0770181536572634/3113100884';

const BottomBanner: React.FC = () => {
  const [loadingAdmobError, setLoadingAdmobError] = useState(false);
  const [isPermission, setIsPermission] = useState(false);

  useEffect(() => {
    // const f = async () => {
    //   if (Platform.OS === 'web') return;
    //   const { status } = await requestPermissionsAsync();
    //   console.log('status', status);
    //   if (status !== 'granted') {
    //     setIsPermission(false);
    //   } else {
    //     setIsPermission(true);
    //   }
    //   await setTestDeviceIDAsync('EMULATOR');
    // };
    // f();
  }, []);

  const onErrorLoadingAdMob = useCallback(() => {
    setLoadingAdmobError(true);
  }, []);

  const renderAds = useCallback(() => {
    if (Platform.OS === 'web') {
      return null;
    }

    if (!loadingAdmobError) {
      return (
        <View style={styles.adMobBanner}>
          {/* <AdMobBanner
            bannerSize='smartBannerPortrait'
            adUnitID={
              Platform.OS === 'ios' ? IOS_AD_UNIT_ID : ANDROID_AD_UNIT_ID
            }
            servePersonalizedAds={isPermission}
            onDidFailToReceiveAdWithError={onErrorLoadingAdMob}
          /> */}
        </View>
      );
    }

    return null;
  }, [isPermission, loadingAdmobError, onErrorLoadingAdMob]);

  return <View>{renderAds()}</View>;
};

export default BottomBanner;
