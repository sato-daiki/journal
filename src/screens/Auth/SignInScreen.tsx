import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackNavigationProp } from '@react-navigation/stack';

import { CheckTextInput } from '@/components/molecules';
import {
  LoadingModal,
  Space,
  SubmitButton,
  LinkText,
  Layout,
  AppText,
} from '@/components/atoms';
import { emailInputError, emailValidate } from '@/utils/common';
import { logAnalytics, events } from '@/utils/Analytics';
import I18n from '@/utils/I18n';
import {
  AuthNavigationProp,
  AuthStackParamList,
} from '@/navigations/AuthNavigator';
import { CompositeNavigationProp } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamList, 'SignIn'>,
  AuthNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp;
};

/**
 * 概要：ログイン画面
 */
const SignInScreen: React.FC<ScreenType> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  useEffect((): void => {
    logAnalytics(events.OPENED_SIGN_IN);
  }, []);

  const clearErrorMessage = (): void => {
    setErrorEmail('');
    setErrorPassword('');
  };

  const onPressLogin = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    clearErrorMessage();
    try {
      const credent = await auth().signInWithEmailAndPassword(email, password);
      if (credent.user) {
        logAnalytics(events.SIGN_IN);
      }
    } catch (err: any) {
      emailInputError(err, setErrorPassword, setErrorEmail, clearErrorMessage);
      setIsLoading(false);
    }
  }, [email, password]);

  const onPressForget = useCallback(() => {
    navigation.navigate('ForegetPassword');
  }, [navigation]);

  const onBlurEmail = useCallback(() => {
    if (email.length === 0) {
      setErrorEmail('');
      return;
    }

    if (emailValidate(email)) {
      setErrorEmail(I18n.t('signIn.invalidEmail'));
    }
    setErrorEmail('');
  }, [email]);

  const onBlurPassword = useCallback(() => {
    setErrorPassword('');
  }, [setErrorPassword]);

  const onChangeTextEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onChangeTextPassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  return (
    <Layout>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.main}>
          <LoadingModal visible={isLoading} />
          <AppText size='m'>{I18n.t('signIn.email')}</AppText>
          <Space size={6} />
          <CheckTextInput
            autoFocus
            value={email}
            onChangeText={onChangeTextEmail}
            onBlur={onBlurEmail}
            maxLength={50}
            placeholder='Email'
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            returnKeyType='done'
            errorMessage={errorEmail}
          />
          <Space size={16} />
          <AppText size='m'>{I18n.t('signIn.password')}</AppText>
          <Space size={6} />
          <CheckTextInput
            isPassword
            value={password}
            onChangeText={onChangeTextPassword}
            onBlur={onBlurPassword}
            maxLength={20}
            placeholder='Password'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            returnKeyType='done'
            errorMessage={errorPassword}
          />
          <Space size={32} />
          <SubmitButton
            title={I18n.t('signIn.login')}
            onPress={onPressLogin}
            disable={
              errorEmail !== '' ||
              errorPassword !== '' ||
              email === '' ||
              password === ''
            }
          />
          <Space size={16} />
          <View style={styles.row}>
            <AppText size='m'>{I18n.t('signIn.forgetText')}</AppText>
            <LinkText
              size='m'
              text={`${I18n.t('signIn.link')}`}
              onPress={onPressForget}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default SignInScreen;
