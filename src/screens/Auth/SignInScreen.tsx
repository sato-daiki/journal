import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackNavigationProp } from '@react-navigation/stack';

import { CheckTextInput } from '@/components/molecules';
import {
  LoadingModal,
  Space,
  SubmitButton,
  LinkText,
} from '@/components/atoms';

import { primaryColor, fontSizeM } from '@/styles/Common';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  label: {
    color: primaryColor,
    fontSize: fontSizeM,
    paddingBottom: 6,
    textAlign: Platform.OS === 'web' ? 'center' : 'left',
  },
  forgetText: {
    color: primaryColor,
    fontSize: fontSizeM,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

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
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.main}>
        <LoadingModal visible={isLoading} />
        <Text style={styles.label}>{I18n.t('signIn.email')}</Text>
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
        <Text style={styles.label}>{I18n.t('signIn.password')}</Text>
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
          <Text style={styles.forgetText}>{I18n.t('signIn.forgetText')}</Text>
          <LinkText onPress={onPressForget} text={`${I18n.t('signIn.link')}`} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignInScreen;
