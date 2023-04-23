import React, { useCallback, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getUser } from '@/utils/user';
import { User, LocalStatus } from '@/types';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import LoadingScreen from '@/screens/LoadingScreen';
import auth from '@react-native-firebase/auth';

export type RootStackParamList = {
  Loading: undefined;
  Onboarding: undefined;
  Main: undefined;
  Auth: undefined;
  Public: undefined;
};

export interface Props {
  user: User;
  localStatus: LocalStatus;
}

interface DispatchProps {
  setUser: (user: User) => void;
  restoreUid: (uid: string | null, onboarding?: boolean) => void;
}

const RootNavigator: React.FC<Props & DispatchProps> = ({
  localStatus,
  user,
  setUser,
  restoreUid,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const initNavigation = useCallback(
    async (authUser): Promise<void> => {
      console.log('initNavigation 1', authUser);
      if (authUser) {
        console.log('initNavigation 2');

        const newUser = await getUser(authUser.uid);
        console.log('newUser', newUser);

        if (newUser) {
          setUser(newUser);
          restoreUid(authUser.uid, newUser.onboarding);
        }
      }
      if (isLoading) setIsLoading(false);
    },
    [isLoading, restoreUid, setUser],
  );

  useEffect(() => {
    const authSubscriber = auth().onAuthStateChanged(initNavigation);
    return authSubscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Stack = createStackNavigator<RootStackParamList>();

  const renderScreen = useCallback(() => {
    console.log(
      `[renderScreen] isLoading:${localStatus.isLoading}, onboarding:${localStatus.onboarding}, uid:${localStatus.uid}`,
    );
    if (isLoading) {
      return <Stack.Screen name='Loading' component={LoadingScreen} />;
    }
    if (localStatus.uid !== null) {
      if (localStatus.onboarding === false) {
        return (
          <Stack.Screen name='Onboarding' component={OnboardingNavigator} />
        );
      }
      return <Stack.Screen name='Main' component={MainNavigator} />;
    }
    return <Stack.Screen name='Auth' component={AuthNavigator} />;
  }, [
    Stack,
    isLoading,
    localStatus.isLoading,
    localStatus.onboarding,
    localStatus.uid,
  ]);

  return (
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
  );
};

export default RootNavigator;
