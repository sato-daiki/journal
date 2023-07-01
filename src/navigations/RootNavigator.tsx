import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { getUser } from '@/utils/user';
import { User, LocalStatus } from '@/types';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import * as Notifications from 'expo-notifications';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import LoadingScreen from '@/screens/LoadingScreen';
import { checkPremium } from '@/utils/purchase';
import { StorageKey } from '@/constants/asyncStorage';
import CheckPasscodeLockScreenContainer from '@/containers/CheckPasscodeLockScreenContainer';
import MaintenanceScreen from '@/screens/MaintenanceScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  Auth: undefined;
};

export interface Props {
  localStatus: LocalStatus;
}

type ConfigMaintenance = {
  status: boolean;
  messageEn: string | null;
  messageJa: string | null;
};

interface DispatchProps {
  setUser: (user: User) => void;
  setIsPremium: (isPremium: boolean) => void;
  setShowCheckPasscode: (showCheckPasscode: boolean) => void;
  setIsLoadingPasscode: (isLoadingPasscode: boolean) => void;
  restoreUid: (uid: string | null, onboarding?: boolean) => void;
}

const RootNavigator: React.FC<Props & DispatchProps> = ({
  localStatus,
  setUser,
  setIsPremium,
  setShowCheckPasscode,
  setIsLoadingPasscode,
  restoreUid,
}) => {
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const temporarilyMovedToBackground = useRef<boolean>(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [maintenance, setMaintenance] = useState<ConfigMaintenance>({
    status: false,
    messageEn: null,
    messageJa: null,
  });

  const initPurchases = useCallback(() => {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
    if (Platform.OS === 'ios') {
      Purchases.configure({ apiKey: process.env.IOS_PURCHASES! });
    } else if (Platform.OS === 'android') {
      Purchases.configure({ apiKey: process.env.ANDROID_PURCHASES! });
    }
  }, []);

  const getMaintenance = useCallback(async () => {
    const doc = await firestore().doc('config/maintenance').get();
    const data = doc.data() as ConfigMaintenance;
    setMaintenance(data);
  }, []);

  const activeCheckHasPasscode = useCallback(async () => {
    const hasPasscode = await AsyncStorage.getItem(StorageKey.hasPasscode);
    if (hasPasscode) {
      setShowCheckPasscode(true);
    }
    setIsLoadingPasscode(false);
  }, [setIsLoadingPasscode, setShowCheckPasscode]);

  const inactiveCheckHasPasscode = useCallback(async () => {
    const hasPasscode = await AsyncStorage.getItem(StorageKey.hasPasscode);
    if (hasPasscode) {
      setIsLoadingPasscode(true);
    }
  }, [setIsLoadingPasscode]);

  const initFirstTimeOnlyFunctions = () => {
    initPurchases();
  };

  const initActiveFunctions = () => {
    getMaintenance();
    activeCheckHasPasscode();
    Notifications.setBadgeCountAsync(0);
  };

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    console.log('RootNavigator -> nextAppState', nextAppState);
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active' &&
      !temporarilyMovedToBackground.current
    ) {
      initActiveFunctions();
    } else if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active' &&
      temporarilyMovedToBackground.current
    ) {
      temporarilyMovedToBackground.current = false;
    } else if (
      appState.current === 'active' &&
      nextAppState.match(/inactive|background/) &&
      !temporarilyMovedToBackground.current
    ) {
      inactiveCheckHasPasscode();
    }
    appState.current = nextAppState;
  };

  const initNavigation = useCallback(
    async (authUser): Promise<void> => {
      if (authUser) {
        const newUser = await getUser(authUser.uid);
        const { customerInfo } = await Purchases.logIn(authUser.uid);
        if (checkPremium(customerInfo)) {
          setIsPremium(true);
        }

        if (newUser) {
          setUser(newUser);
          restoreUid(authUser.uid, newUser.onboarding);
        }
      }
      setIsInitialLoading(false);
    },
    [restoreUid, setIsPremium, setUser],
  );

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      _handleAppStateChange,
    );
    const authSubscriber = auth().onAuthStateChanged(initNavigation);

    initFirstTimeOnlyFunctions();
    initActiveFunctions();
    return () => {
      authSubscriber();
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Stack = createStackNavigator<RootStackParamList>();

  const renderMainScreen = useCallback(() => {
    if (localStatus.uid !== null) {
      if (localStatus.onboarding === false) {
        return (
          <Stack.Screen name='Onboarding' component={OnboardingNavigator} />
        );
      }
      return <Stack.Screen name='Main' component={MainNavigator} />;
    }
    return <Stack.Screen name='Auth' component={AuthNavigator} />;
  }, [localStatus.uid, localStatus.onboarding, Stack]);

  if (maintenance.status) {
    return (
      <MaintenanceScreen
        messageEn={maintenance.messageEn}
        messageJa={maintenance.messageJa}
      />
    );
  }

  if (isInitialLoading || localStatus.isLoadingPasscode) {
    return <LoadingScreen />;
  }

  if (localStatus.showCheckPasscode) {
    return (
      <CheckPasscodeLockScreenContainer
        temporarilyMovedToBackground={temporarilyMovedToBackground}
      />
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      {renderMainScreen()}
    </Stack.Navigator>
  );
};

export default RootNavigator;
