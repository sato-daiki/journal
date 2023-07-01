import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

import { StackNavigationProp } from '@react-navigation/stack';
import { SettingTabStackParamList } from '../../navigations/SettingTabNavigator';
import I18n from '../../utils/I18n';
import { RouteProp } from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import { SecureStorageKey, StorageKey } from '@/constants/asyncStorage';
import PasscodeLock from '@/components/organisms/PasscodeLock';
import { Layout } from '@/components/atoms';

interface DispatchProps {
  setHasPasscode: (hasPasscode: boolean) => void;
}

type ScreenType = {
  navigation: StackNavigationProp<
    SettingTabStackParamList,
    'RePasscodeLockSetting'
  >;
  route: RouteProp<SettingTabStackParamList, 'RePasscodeLockSetting'>;
} & DispatchProps;

const RePasscodeLockSettingScreen: React.FC<ScreenType> = ({
  navigation,
  route,
  setHasPasscode,
}) => {
  const [passcode, setPasscode] = useState('');

  const onEnded = useCallback(async () => {
    setTimeout(() => {
      navigation.navigate('Setting');
      setPasscode('');
    }, 200);
  }, [navigation]);

  const onPressOk = useCallback(async () => {
    await AsyncStorage.setItem(StorageKey.isLocalAuthentication, 'true');
    onEnded();
  }, [onEnded]);

  const saveSecureStore = useCallback(
    async (text: string) => {
      try {
        await SecureStore.setItemAsync(SecureStorageKey.passcode, text);
        // SettingScreenの描写にはReduxのhasPasscodeを使う
        // RootNatigatorの制御ではAsyncStorageのhasPasscodeを使う
        // なので両方必要
        await AsyncStorage.setItem(StorageKey.hasPasscode, 'true');
        setHasPasscode(true);

        // 端末がface or fingerprint scanner に対応しているかどうか
        const compatible = await LocalAuthentication.hasHardwareAsync();
        if (compatible) {
          Alert.alert(I18n.t('passcodeLock.alertBiometric'), '', [
            {
              text: I18n.t('passcodeLock.alertBiometricOk'),
              onPress: onPressOk,
              isPreferred: true,
            },
            {
              text: I18n.t('passcodeLock.alertBiometricNo'),
              onPress: onEnded,
              isPreferred: false,
            },
          ]);
        } else {
          onEnded();
        }
      } catch (e) {
        Toast.show(I18n.t('passcodeLock.errorSet'), {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
        });
        onEnded();
      }
    },
    [onEnded, onPressOk, setHasPasscode],
  );

  const onCheck = useCallback(
    async (passcode: string) => {
      if (route.params.passcode === passcode) {
        saveSecureStore(passcode);
        return true;
      } else {
        navigation.navigate('PasscodeLockSetting', {
          message: I18n.t('passcodeLock.messageRePasscode'),
        });
        setPasscode('');
        return false;
      }
    },
    [navigation, route.params.passcode, saveSecureStore],
  );

  return (
    <Layout>
      <PasscodeLock
        title={I18n.t('passcodeLock.reInput')}
        passcode={passcode}
        setPasscode={setPasscode}
        onCheck={onCheck}
      />
    </Layout>
  );
};

export default RePasscodeLockSettingScreen;
