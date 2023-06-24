import React, { useCallback, useState } from 'react';

import { StackNavigationProp } from '@react-navigation/stack';
import {
  MyPageTabNavigationProp,
  MyPageTabStackParamList,
} from '../../navigations/MyPageTabNavigator';
import I18n from '../../utils/I18n';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import PasscodeLock from '@/components/organisms/PasscodeLock';

type PasscodeLockSettingNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyPageTabStackParamList, 'PasscodeLockSetting'>,
  MyPageTabNavigationProp
>;

type ScreenType = {
  navigation: PasscodeLockSettingNavigationProp;
  route: RouteProp<MyPageTabStackParamList, 'PasscodeLockSetting'>;
};

const PasscodeLockSettingScreen: React.FC<ScreenType> = ({
  navigation,
  route,
}) => {
  const [passcode, setPasscode] = useState('');

  const onCheck = useCallback(
    async (value) => {
      setTimeout(() => {
        navigation.navigate('RePasscodeLockSetting', { passcode: value });
        setPasscode('');
      }, 200);
      return true;
    },
    [navigation],
  );

  return (
    <PasscodeLock
      title={I18n.t('passcodeLock.input')}
      passcode={passcode}
      message={route.params?.message}
      setPasscode={setPasscode}
      onCheck={onCheck}
    />
  );
};

export default PasscodeLockSettingScreen;
