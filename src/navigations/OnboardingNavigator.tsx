import React from 'react';
import ReminderInitialOnboardingScreenContainer from '@/containers/ReminderInitialOnboardingScreenContainer';
import ReminderSelectTimeOnboardingScreenContainer from '@/containers/ReminderSelectTimeOnboardingScreenContainer';
import PushSettingScreenContainer from '@/containers/PushSettingScreenContainer';
import ReminderSelectDayScreen from '@/screens/Onboarding/ReminderSelectDayScreen';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import I18n from '@/utils/I18n';
import { CustomTimeInfo, FixDay } from '@/types';
import { RootStackParamList } from './RootNavigator';
import { useAppTheme } from '@/styles/colors';
import { getDefaultScreenOptions } from '@/styles/navigationOptions';

export type OnboardingNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

export type OnboardingStackParamList = {
  PushSetting: undefined;
  ReminderInitialOnboarding: undefined;
  ReminderSelectTimeOnboarding: undefined;
  ReminderSelectDay: {
    checkedDays: FixDay[] | CustomTimeInfo[];
    onChangeCheckedDays: (checkedDays: FixDay[] | CustomTimeInfo[]) => void;
  };
};

const Stack = createStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator = () => {
  const theme = useAppTheme();
  const DefaultScreenOptions = getDefaultScreenOptions(theme);
  return (
    <Stack.Navigator
      initialRouteName='PushSetting'
      screenOptions={DefaultScreenOptions}
    >
      <Stack.Screen
        name='PushSetting'
        component={PushSettingScreenContainer}
        options={{
          title: I18n.t('onboarding.pushSetting'),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='ReminderInitialOnboarding'
        component={ReminderInitialOnboardingScreenContainer}
        options={{
          title: I18n.t('onboarding.reminderInitial'),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='ReminderSelectTimeOnboarding'
        component={ReminderSelectTimeOnboardingScreenContainer}
        options={{
          title: I18n.t('onboarding.reminderSelectTime'),
        }}
      />
      <Stack.Screen
        name='ReminderSelectDay'
        component={ReminderSelectDayScreen}
        options={{
          title: I18n.t('onboarding.reminderSelectDay'),
        }}
      />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
