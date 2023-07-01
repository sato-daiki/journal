import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AppState, AppStateStatus, useColorScheme } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { getUser } from '@/utils/user';
import { User, LocalStatus } from '@/types';
import Purchases from 'react-native-purchases';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PaperProvider } from 'react-native-paper';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import LoadingScreen from '@/screens/LoadingScreen';
import { checkPremium } from '@/utils/purchase';
import { StorageKey } from '@/constants/asyncStorage';
import CheckPasscodeLockScreenContainer from '@/containers/CheckPasscodeLockScreenContainer';
import { darkTheme, lightTheme } from '@/styles/colors';

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  Auth: undefined;
};

export interface Props {
  localStatus: LocalStatus;
}

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
  const scheme = useColorScheme();

  const theme = useMemo(() => {
    if (!localStatus.darkMode || localStatus.darkMode === 'device') {
      if (scheme === 'light') {
        return lightTheme;
      } else {
        return darkTheme;
      }
    } else if (localStatus.darkMode === 'light') {
      return lightTheme;
    } else {
      return darkTheme;
    }
  }, [localStatus.darkMode, scheme]);

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

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    console.log('RootNavigator -> nextAppState', nextAppState);
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active' &&
      !temporarilyMovedToBackground.current
    ) {
      activeCheckHasPasscode();
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

    activeCheckHasPasscode();
    return () => {
      authSubscriber();
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Stack = createStackNavigator<RootStackParamList>();

  const renderScreen = useCallback(() => {
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
    <PaperProvider theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      >
        {renderScreen()}
      </Stack.Navigator>
    </PaperProvider>
  );
};

export default RootNavigator;
