import React, { useCallback, useState } from 'react';
import ReminderSelectTime from '@/components/organisms/ReminderSelectTime/ReminderSelectTime';
import { OnboardingStackParamList } from '@/navigations/OnboardingNavigator';
import { User } from '@/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoadingModal } from '@/components/atoms';
import { initCuctomTimeInfos, initFixDays, initFixTimeInfo } from './interface';
import firestore from '@react-native-firebase/firestore';

export interface Props {
  user: User;
}

interface DispatchProps {
  setUser: (user: User) => void;
  completedOnboarding: () => void;
}

export type ReminderSelectTimeOnboardingNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'ReminderSelectTimeOnboarding'
>;

type ScreenType = {
  navigation: ReminderSelectTimeOnboardingNavigationProp;
} & Props &
  DispatchProps;

const ReminderSelectTimeOnboardingScreen: React.FC<ScreenType> = ({
  navigation,
  completedOnboarding,
  user,
  setUser,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const afterSave = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    await firestore().doc(`users/${user.uid}`).update({
      onboarding: true,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
    completedOnboarding();
    setIsLoading(false);
  }, [completedOnboarding, isLoading, user.uid]);

  const gotoReminderSelectDay = useCallback(
    (param) => {
      navigation.navigate('ReminderSelectDay', param);
    },
    [navigation],
  );

  return (
    <>
      <LoadingModal visible={isLoading} />
      <ReminderSelectTime
        navigation={navigation}
        defaultReminderType='fix'
        defaultNotificationStart
        defaultNotificationEnd
        defaultFixDays={initFixDays}
        defaultFixTimeInfo={initFixTimeInfo}
        defaultCuctomTimeInfos={initCuctomTimeInfos}
        user={user}
        setUser={setUser}
        gotoReminderSelectDay={gotoReminderSelectDay}
        afterSave={afterSave}
      />
    </>
  );
};

export default ReminderSelectTimeOnboardingScreen;
