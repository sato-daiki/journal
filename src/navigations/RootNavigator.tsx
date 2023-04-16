import React, { useCallback, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getUser } from '@/utils/user';
import { User, LocalStatus } from '@/types';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import LoadingScreen from '@/screens/LoadingScreen';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/constants/firebase';

export type RootStackParamList = {
  Loading: undefined;
  Onboarding: undefined;
  Main: undefined;
  Auth: undefined;
  Public: undefined;
};

export interface Props {
  localStatus: LocalStatus;
}

interface DispatchProps {
  setUser: (user: User) => void;
  restoreUid: (uid: string | null, onboarding?: boolean) => void;
}

const RootNavigator: React.FC<Props & DispatchProps> = ({
  localStatus,
  setUser,
  restoreUid,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const initNavigation = useCallback(
    async (authUser: FirebaseUser | null): Promise<void> => {
      console.log('initNavigation');
      if (authUser) {
        const newUser = await getUser(authUser.uid);
        console.log('newUser', newUser);
        if (newUser) {
          setUser(newUser);
          restoreUid(authUser.uid, newUser.onboarding);
        }
      } else {
        restoreUid(null, false);
      }
      if (isLoading) setIsLoading(false);
    },
    [isLoading, restoreUid, setUser],
  );

  useEffect(() => {
    const authSubscriber = onAuthStateChanged(auth, initNavigation);
    return authSubscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Stack = createStackNavigator<RootStackParamList>();

  const renderScreen = useCallback(() => {
    console.log(
      `[renderScreen] isLoading:${localStatus.isLoading}, onboarding:${localStatus.onboarding}, uid:${localStatus.uid}`,
    );
    // if (localStatus.isLoading) {
    //   return <Stack.Screen name='Loading' component={LoadingScreen} />;
    // }
    if (localStatus.uid !== null) {
      if (localStatus.onboarding === false) {
        return (
          <Stack.Screen name='Onboarding' component={OnboardingNavigator} />
        );
      }
      return (
        <Stack.Screen
          name='Main'
          component={MainNavigator}
          options={{
            headerShown: false,
          }}
        />
      );
    }
    return <Stack.Screen name='Auth' component={AuthNavigator} />;
  }, [Stack, localStatus.isLoading, localStatus.onboarding, localStatus.uid]);

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
