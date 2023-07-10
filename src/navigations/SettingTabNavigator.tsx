import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import ReminderSelectDayScreen from '@/screens/Onboarding/ReminderSelectDayScreen';
import { CustomTimeInfo, FixDay } from '@/types';
import ReminderSelectTimeSettingScreenContainer from '@/containers/ReminderSelectTimeSettingScreenContainer';
import ReminderInitialSettingScreen from '@/screens/Onboarding/ReminderInitialSettingScreen';
import I18n from '../utils/I18n';

/* screens */
import SettingScreenContainer from '../containers/SettingScreenContainer';
import EditEmailScreen from '../screens/SettingTab/EditEmailScreen';
import EditPasswordScreen from '../screens/SettingTab/EditPasswordScreen';
import RegisterEmailPasswordScreen from '../screens/SettingTab/RegisterEmailPasswordScreen';
import DeleteAcountScreenContainer from '../containers/DeleteAcountScreenContainer';
import ForegetPasswordScreen from '../screens/Auth/ForegetPasswordScreen';
import InquiryScreenContainer from '../containers/InquiryScreenContainer';
import { getDefaultScreenOptions } from '../styles/navigationOptions';
import {
  HomeBottomParamList,
  HomeBottomNavigationProp,
} from './HomeBottomTabNavigator';
import { WebViewNavParams, WebViewScreen } from '@/screens/WebViewScreen';
import PasscodeLockSettingScreen from '@/screens/SettingTab/PasscodeLockSetting';
import RePasscodeLockSettingScreenContainer from '@/containers/RePasscodeLockSettingScreenContainer';
import DisplayScreenContainer from '@/containers/DisplayScreenContainer';
import { useAppTheme } from '@/styles/colors';
import FontSizeScreenContainer from '@/containers/FontSizeScreenContainer';

export type SettingTabNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeBottomParamList, 'SettingTab'>,
  HomeBottomNavigationProp
>;

export type SettingTabStackParamList = {
  Setting: undefined;
  Display: undefined;
  FontSize: undefined;
  Inquiry: undefined;
  EditEmail: undefined;
  EditPassword: undefined;
  RegisterEmailPassword: undefined;
  DeleteAcount: undefined;
  ForegetPassword: undefined;
  PasscodeLockSetting: { message?: string } | undefined;
  RePasscodeLockSetting: { passcode: string };
  ReminderInitialSetting: undefined;
  ReminderSelectTimeSetting: undefined;
  ReminderSelectDay: {
    checkedDays: FixDay[] | CustomTimeInfo[];
    onChangeCheckedDays: (checkedDays: FixDay[] | CustomTimeInfo[]) => void;
  };
  AboutWebView: WebViewNavParams;
};

const SettingTabStack = createStackNavigator<SettingTabStackParamList>();

const SettingTabNavigator = () => {
  const theme = useAppTheme();
  const DefaultScreenOptions = getDefaultScreenOptions(theme);

  return (
    <SettingTabStack.Navigator
      initialRouteName='Setting'
      screenOptions={DefaultScreenOptions}
    >
      <SettingTabStack.Screen
        name='Display'
        component={DisplayScreenContainer}
        options={{ title: I18n.t('display.headerTitle') }}
      />
      <SettingTabStack.Screen
        name='FontSize'
        component={FontSizeScreenContainer}
        options={{ title: I18n.t('fontSize.headerTitle') }}
      />
      <SettingTabStack.Screen
        name='Setting'
        component={SettingScreenContainer}
        options={{ title: I18n.t('setting.headerTitle') }}
      />
      <SettingTabStack.Screen
        name='Inquiry'
        component={InquiryScreenContainer}
        options={{ title: I18n.t('inquiry.headerTitle') }}
      />
      <SettingTabStack.Screen
        name='EditEmail'
        component={EditEmailScreen}
        options={{ title: I18n.t('editEmail.headerTitle') }}
      />
      <SettingTabStack.Screen
        name='EditPassword'
        component={EditPasswordScreen}
        options={{ title: I18n.t('editPassword.headerTitle') }}
      />
      <SettingTabStack.Screen
        name='RegisterEmailPassword'
        component={RegisterEmailPasswordScreen}
        options={{ title: I18n.t('registerEmailPassword.headerTitle') }}
      />
      <SettingTabStack.Screen
        name='DeleteAcount'
        component={DeleteAcountScreenContainer}
        options={{ title: I18n.t('deleteAcount.headerTitle') }}
      />
      <SettingTabStack.Screen
        name='ForegetPassword'
        component={ForegetPasswordScreen}
        options={{ title: I18n.t('foregetPassword.headerTitle') }}
      />
      <SettingTabStack.Screen
        name='PasscodeLockSetting'
        component={PasscodeLockSettingScreen}
        options={{
          title: I18n.t('passcodeLock.headerTitle'),
        }}
      />
      <SettingTabStack.Screen
        name='RePasscodeLockSetting'
        component={RePasscodeLockSettingScreenContainer}
        options={{
          title: I18n.t('passcodeLock.headerTitle'),
        }}
      />
      <SettingTabStack.Screen
        name='ReminderInitialSetting'
        component={ReminderInitialSettingScreen}
        options={{
          title: I18n.t('onboarding.reminderInitial'),
        }}
      />
      <SettingTabStack.Screen
        name='ReminderSelectTimeSetting'
        component={ReminderSelectTimeSettingScreenContainer}
        options={{
          title: I18n.t('onboarding.reminderSelectTime'),
        }}
      />
      <SettingTabStack.Screen
        name='ReminderSelectDay'
        component={ReminderSelectDayScreen}
        options={{
          title: I18n.t('onboarding.reminderSelectDay'),
        }}
      />
      <SettingTabStack.Screen name='AboutWebView' component={WebViewScreen} />
    </SettingTabStack.Navigator>
  );
};

export default SettingTabNavigator;
