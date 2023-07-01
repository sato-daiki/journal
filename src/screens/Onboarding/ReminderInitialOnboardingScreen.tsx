import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import ReminderInitial from '@/components/organisms/ReminderInitial';
import { Layout, LinkText, Space, SubmitButton } from '@/components/atoms';

import I18n from '@/utils/I18n';
import { User } from '@/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '@/navigations/OnboardingNavigator';
import firestore from '@react-native-firebase/firestore';

export interface Props {
  user: User;
}

interface DispatchProps {
  completedOnboarding: () => void;
}

export type NavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'ReminderSelectTimeOnboarding'
>;

export type ScreenType = {
  navigation: NavigationProp;
} & Props &
  DispatchProps;

const ReminderInitialOnboardingScreen: React.FC<ScreenType> = ({
  navigation,
  user,
  completedOnboarding,
}) => {
  const onPressSubmit = useCallback(() => {
    navigation.navigate('ReminderSelectTimeOnboarding');
  }, [navigation]);

  const onPressSkip = useCallback(async () => {
    await firestore().doc(`users/${user.uid}`).update({
      onboarding: true,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
    completedOnboarding();
  }, [completedOnboarding, user.uid]);

  return (
    <Layout innerStyle={styles.container}>
      <ReminderInitial />
      <View style={styles.linkContainer}>
        <SubmitButton
          title={I18n.t('reminderInitial.submit')}
          onPress={onPressSubmit}
        />
        <Space size={16} />
        <LinkText
          size='m'
          textAlign='center'
          text={I18n.t('common.skip')}
          onPress={onPressSkip}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 64,
  },
  linkContainer: {
    height: 100,
  },
});

export default ReminderInitialOnboardingScreen;
