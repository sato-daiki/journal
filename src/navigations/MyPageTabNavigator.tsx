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
import MyPageScreenContainer from '../containers/MyPageScreenContainer';
import SettingScreenContainer from '../containers/SettingScreenContainer';
import EditEmailScreen from '../screens/MyPageTab/EditEmailScreen';
import EditPasswordScreen from '../screens/MyPageTab/EditPasswordScreen';
import RegisterEmailPasswordScreen from '../screens/MyPageTab/RegisterEmailPasswordScreen';
import DeleteAcountScreenContainer from '../containers/DeleteAcountScreenContainer';
import ForegetPasswordScreen from '../screens/Auth/ForegetPasswordScreen';
import InquiryScreenContainer from '../containers/InquiryScreenContainer';
import { DefaultNavigationOptions } from '../constants/NavigationOptions';
import {
  HomeBottomParamList,
  HomeBottomNavigationProp,
} from './HomeBottomTabNavigator';
import { WebViewNavParams, WebViewScreen } from '@/screens/WebViewScreen';
import PasscodeLockSettingScreen from '@/screens/MyPageTab/PassCodeLockSetting';
import RePasscodeLockSettingScreenContainer from '@/containers/RePassCodeLockSettingScreenContainer';

export type MyPageTabNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeBottomParamList, 'MyPageTab'>,
  HomeBottomNavigationProp
>;

export type MyPageTabStackParamList = {
  MyPage: undefined;
  Setting: undefined;
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

const MyPageTabStack = createStackNavigator<MyPageTabStackParamList>();

const MyPageTabNavigator = () => {
  return (
    <MyPageTabStack.Navigator
      initialRouteName='MyPage'
      screenOptions={DefaultNavigationOptions}
    >
      <MyPageTabStack.Screen
        name='MyPage'
        component={MyPageScreenContainer}
        options={{ title: I18n.t('myPage.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name='Setting'
        component={SettingScreenContainer}
        options={{ title: I18n.t('setting.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name='Inquiry'
        component={InquiryScreenContainer}
        options={{ title: I18n.t('inquiry.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name='EditEmail'
        component={EditEmailScreen}
        options={{ title: I18n.t('editEmail.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name='EditPassword'
        component={EditPasswordScreen}
        options={{ title: I18n.t('editPassword.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name='RegisterEmailPassword'
        component={RegisterEmailPasswordScreen}
        options={{ title: I18n.t('registerEmailPassword.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name='DeleteAcount'
        component={DeleteAcountScreenContainer}
        options={{ title: I18n.t('deleteAcount.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name='ForegetPassword'
        component={ForegetPasswordScreen}
        options={{ title: I18n.t('foregetPassword.headerTitle') }}
      />
      <MyPageTabStack.Screen
        name='PasscodeLockSetting'
        component={PasscodeLockSettingScreen}
        options={{
          title: I18n.t('passcodeLock.headerTitle'),
        }}
      />
      <MyPageTabStack.Screen
        name='RePasscodeLockSetting'
        component={RePasscodeLockSettingScreenContainer}
        options={{
          title: I18n.t('passcodeLock.headerTitle'),
        }}
      />
      <MyPageTabStack.Screen
        name='ReminderInitialSetting'
        component={ReminderInitialSettingScreen}
        options={{
          title: I18n.t('onboarding.reminderInitial'),
        }}
      />
      <MyPageTabStack.Screen
        name='ReminderSelectTimeSetting'
        component={ReminderSelectTimeSettingScreenContainer}
        options={{
          title: I18n.t('onboarding.reminderSelectTime'),
        }}
      />
      <MyPageTabStack.Screen
        name='ReminderSelectDay'
        component={ReminderSelectDayScreen}
        options={{
          title: I18n.t('onboarding.reminderSelectDay'),
        }}
      />
      <MyPageTabStack.Screen name='AboutWebView' component={WebViewScreen} />
    </MyPageTabStack.Navigator>
  );
};

export default MyPageTabNavigator;
