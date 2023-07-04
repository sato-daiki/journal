import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackNavigationProp } from '@react-navigation/stack';

import { Layout } from '@/components/templates';
import { CheckTextInput } from '@/components/molecules';
import {
  Space,
  SubmitButton,
  LoadingModal,
  WhiteButton,
  LinkText,
  AppText,
} from '@/components/atoms';

import {
  AuthNavigationProp,
  AuthStackParamList,
} from '@/navigations/AuthNavigator';
import { User } from '@/types';
import { logAnalytics, events } from '@/utils/Analytics';
import {
  emailInputError,
  emailValidate,
  emaillExistCheck,
} from '@/utils/common';
import I18n from '@/utils/I18n';
import { CompositeNavigationProp } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { PRIVACY_POLICY, TERMS } from '@/constants/url';
import { useAppTheme } from '@/styles/colors';

export interface Props {
  user: User;
}

interface DispatchProps {
  signIn: (uid: string) => void;
  setUser: (user: User) => void;
}
type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamList, 'SignUp'>,
  AuthNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp;
} & Props &
  DispatchProps;

/**
 * 概要：アカウント登録画面
 */
const SignUpScreen: React.FC<ScreenType> = ({
  navigation,
  user,
  signIn,
  setUser,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  const [isEmailCheckOk, setIsEmailCheckOk] = useState(false);
  const [isPasswordCheckOk, setIsPasswordCheckOk] = useState(false);

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const theme = useAppTheme();

  useEffect((): void => {
    logAnalytics(events.OPENED_SIGN_UP);
  }, []);

  const clearErrorMessage = useCallback((): void => {
    setErrorEmail('');
    setErrorPassword('');
  }, []);

  const createUser = useCallback(
    async (credentUser): Promise<void> => {
      const userInfo = {
        learnLanguage: user.learnLanguage,
        diaryPosted: false,
        onboarding: false,
        expoPushToken: null,
        themeDiaries: null,
        passcodeLock: false,
        runningDays: 0,
        runningWeeks: 0,
        lastDiaryPostedAt: null,
        createdAt:
          firestore.FieldValue.serverTimestamp() as FirebaseFirestoreTypes.Timestamp,
        updatedAt:
          firestore.FieldValue.serverTimestamp() as FirebaseFirestoreTypes.Timestamp,
      };

      firestore().doc(`users/${credentUser.uid}`).set(userInfo);
      signIn(credentUser.uid);
      setUser({ ...userInfo, uid: credentUser.uid });
      logAnalytics(events.CREATED_USER);
    },
    [user.learnLanguage, setUser, signIn],
  );

  const onPressSkip = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    clearErrorMessage();
    try {
      const credent = await auth().signInAnonymously();
      if (credent.user) {
        createUser(credent.user);
      }
    } catch (err: any) {
      emailInputError(err, setErrorPassword, setErrorEmail, clearErrorMessage);
      setIsLoading(false);
    }
  }, [clearErrorMessage, createUser]);

  const onPressSubmit = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    clearErrorMessage();
    try {
      const credent = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (credent.user) {
        createUser(credent.user);
      }
    } catch (err: any) {
      emailInputError(err, setErrorPassword, setErrorEmail, clearErrorMessage);
      setIsLoading(false);
    }
  }, [clearErrorMessage, createUser, email, password]);

  const onBlurEmail = useCallback(async (): Promise<void> => {
    if (email.length === 0) {
      setIsEmailCheckOk(false);
      setErrorEmail('');
      return;
    }

    if (emailValidate(email)) {
      setIsEmailCheckOk(false);
      setErrorEmail(I18n.t('errorMessage.invalidEmail'));
      return;
    }

    setIsEmailLoading(true);
    const res = await emaillExistCheck(email);

    if (res) {
      setIsEmailCheckOk(false);
      setErrorEmail(I18n.t('errorMessage.emailAlreadyInUse'));
    } else {
      setIsEmailCheckOk(true);
      setErrorEmail('');
    }
    setIsEmailLoading(false);
  }, [email, setIsEmailCheckOk, setErrorEmail, setIsEmailLoading]);

  const onBlurPassword = useCallback(() => {
    if (password.length === 0) {
      setIsPasswordCheckOk(false);
      setErrorPassword('');
    } else if (password.length > 0 && password.length < 6) {
      setIsPasswordCheckOk(false);
      setErrorPassword(I18n.t('errorMessage.weakPassword'));
    } else {
      setIsPasswordCheckOk(true);
      setErrorPassword('');
    }
  }, [password, setIsPasswordCheckOk, setErrorPassword]);

  return (
    <Layout>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.main}>
          <LoadingModal visible={isLoading} />
          <AppText size='l' bold>
            {I18n.t('signUp.title')}
          </AppText>
          <Space size={16} />
          <AppText size='m' color={theme.colors.secondary}>
            {I18n.t('signUp.subText')}
          </AppText>
          <Space size={16} />
          <AppText size='m'>{I18n.t('signUp.email')}</AppText>
          <Space size={6} />
          <CheckTextInput
            value={email}
            onChangeText={setEmail}
            onBlur={onBlurEmail}
            maxLength={50}
            placeholder='Email'
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            returnKeyType='done'
            isLoading={isEmailLoading}
            isCheckOk={isEmailCheckOk}
            errorMessage={errorEmail}
          />
          <Space size={16} />
          <AppText size='m'>{I18n.t('signUp.password')}</AppText>
          <Space size={6} />
          <CheckTextInput
            isPassword
            value={password}
            onChangeText={setPassword}
            onBlur={onBlurPassword}
            maxLength={20}
            placeholder='Password'
            autoCapitalize='none'
            autoCorrect={false}
            returnKeyType='done'
            errorMessage={errorPassword}
          />
          <Space size={16} />
          <SubmitButton
            title={I18n.t('common.register')}
            onPress={onPressSubmit}
            disable={!isEmailCheckOk || !isPasswordCheckOk}
          />
          <Space size={32} />
          <View style={styles.row}>
            <View
              style={[
                styles.line,
                { borderBottomColor: theme.colors.secondary },
              ]}
            />
            <AppText
              size='m'
              color={theme.colors.secondary}
              style={styles.or}
              textAlign='center'
            >
              or
            </AppText>
            <View
              style={[
                styles.line,
                { borderBottomColor: theme.colors.secondary },
              ]}
            />
          </View>
          <Space size={32} />
          <WhiteButton title={I18n.t('signUp.without')} onPress={onPressSkip} />
          <Space size={16} />
          <View style={styles.row}>
            <AppText size='s' color={theme.colors.secondary}>
              {I18n.t('signUp.agree1')}
            </AppText>
            <LinkText
              size='s'
              text={I18n.t('signUp.terms')}
              onPress={(): void => {
                navigation.navigate('AuthWebView', TERMS);
              }}
            />
            <AppText size='m' color={theme.colors.secondary}>
              {I18n.t('signUp.agree2')}
            </AppText>
            <LinkText
              size='s'
              text={I18n.t('signUp.privacy')}
              onPress={(): void => {
                navigation.navigate('AuthWebView', PRIVACY_POLICY);
              }}
            />
            <AppText size='m' color={theme.colors.secondary}>
              {I18n.t('signUp.agree3')}
            </AppText>
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
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  line: {
    borderBottomWidth: 1,
    flex: 1,
  },
  or: {
    paddingHorizontal: 16,
  },
});

export default SignUpScreen;
