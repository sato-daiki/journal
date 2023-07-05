import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { useAppTheme } from '@/styles/colors';

/* screens */
import InitializeScreen from '@/screens/Auth/InitializeScreen';
import SelectLanguageScreenContainer from '@/containers/SelectLanguageScreenContainer';
import SignUpScreenContainer from '@/containers/SignUpScreenContainer';
import SignInScreen from '@/screens/Auth/SignInScreen';
import ForegetPasswordScreen from '@/screens/Auth/ForegetPasswordScreen';

import I18n from '@/utils/I18n';
import { RootStackParamList } from './RootNavigator';
import { WebViewNavParams, WebViewScreen } from '@/screens/WebViewScreen';
import { getDefaultScreenOptions } from '@/styles/navigationOptions';

export type AuthNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Auth'
>;

export type AuthStackParamList = {
  Initialize: { lang?: string } | undefined;
  SelectLanguage: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForegetPassword: undefined;
  AuthWebView: WebViewNavParams;
};

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  const theme = useAppTheme();
  const DefaultScreenOptions = getDefaultScreenOptions(theme);
  return (
    <Stack.Navigator
      initialRouteName='Initialize'
      screenOptions={DefaultScreenOptions}
    >
      <Stack.Screen
        name='Initialize'
        component={InitializeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='SelectLanguage'
        component={SelectLanguageScreenContainer}
        options={{
          title: I18n.t('selectLanguage.headerTitle'),
        }}
      />
      <Stack.Screen
        name='SignIn'
        component={SignInScreen}
        options={{
          title: I18n.t('signIn.headerTitle'),
        }}
      />
      <Stack.Screen
        name='SignUp'
        component={SignUpScreenContainer}
        options={{
          title: I18n.t('signUp.headerTitle'),
        }}
      />
      <Stack.Screen
        name='ForegetPassword'
        component={ForegetPasswordScreen}
        options={{
          title: I18n.t('foregetPassword.headerTitle'),
        }}
      />
      <Stack.Screen name='AuthWebView' component={WebViewScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
