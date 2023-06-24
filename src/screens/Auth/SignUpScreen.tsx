import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackNavigationProp } from '@react-navigation/stack';

import { CheckTextInput } from '@/components/molecules';
import {
  Space,
  SubmitButton,
  LoadingModal,
  WhiteButton,
  LinkText,
} from '@/components/atoms';

import {
  AuthNavigationProp,
  AuthStackParamList,
} from '@/navigations/AuthNavigator';
import { User } from '@/types';
import {
  primaryColor,
  fontSizeM,
  subTextColor,
  fontSizeL,
  fontSizeS,
} from '@/styles/Common';
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
  title: {
    color: primaryColor,
    fontSize: fontSizeL,
    fontWeight: 'bold',
    paddingBottom: 16,
    lineHeight: fontSizeL * 1.3,
    textAlign: Platform.OS === 'web' ? 'center' : 'left',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  line: {
    borderBottomColor: subTextColor,
    borderBottomWidth: 1,
    flex: 1,
  },
  or: {
    color: subTextColor,
    textAlign: 'center',
    fontSize: fontSizeM,
    paddingHorizontal: 16,
  },
  agree: {
    color: subTextColor,
    fontSize: fontSizeS,
    lineHeight: fontSizeS * 1.3,
  },
  linkText: {
    fontSize: fontSizeS,
    lineHeight: fontSizeM * 1.3,
  },
  subText: {
    color: subTextColor,
    fontSize: fontSizeM,
    paddingBottom: 16,
    lineHeight: fontSizeM * 1.3,
    textAlign: Platform.OS === 'web' ? 'center' : 'left',
  },
  label: {
    color: primaryColor,
    fontSize: fontSizeM,
    paddingBottom: 6,
    textAlign: Platform.OS === 'web' ? 'center' : 'left',
  },
});

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
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.main}>
        <LoadingModal visible={isLoading} />

        <Text style={styles.title}>{I18n.t('signUp.title')}</Text>
        <Text style={styles.subText}>{I18n.t('signUp.subText')}</Text>
        <Text style={styles.label}>{I18n.t('signUp.email')}</Text>
        <CheckTextInput
          autoFocus
          value={email}
          onChangeText={(text: string): void => setEmail(text)}
          onBlur={onBlurEmail}
          maxLength={50}
          placeholder='Email'
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          underlineColorAndroid='transparent'
          returnKeyType='done'
          isLoading={isEmailLoading}
          isCheckOk={isEmailCheckOk}
          errorMessage={errorEmail}
        />
        <Space size={16} />
        <Text style={styles.label}>{I18n.t('signUp.password')}</Text>
        <CheckTextInput
          value={password}
          onChangeText={setPassword}
          onBlur={onBlurPassword}
          maxLength={20}
          placeholder='Password'
          autoCapitalize='none'
          autoCorrect={false}
          underlineColorAndroid='transparent'
          secureTextEntry
          returnKeyType='done'
          isCheckOk={isPasswordCheckOk}
          errorMessage={errorPassword}
        />
        <Space size={16} />
        <SubmitButton
          title={I18n.t('common.register')}
          onPress={onPressSubmit}
          disable={!(isEmailCheckOk && isPasswordCheckOk)}
        />
        <Space size={32} />
        <View style={styles.row}>
          <View style={styles.line} />
          <Text style={styles.or}>or</Text>
          <View style={styles.line} />
        </View>
        <Space size={32} />
        <WhiteButton title={I18n.t('signUp.without')} onPress={onPressSkip} />
        <Space size={16} />
        <View style={styles.row}>
          <Text style={styles.agree}>{I18n.t('signUp.agree1')}</Text>
          <LinkText
            textStyle={styles.linkText}
            onPress={(): void => {
              navigation.navigate('AuthWebView', TERMS);
            }}
            text={I18n.t('signUp.terms')}
          />
          <Text style={styles.agree}>{I18n.t('signUp.agree2')}</Text>
          <LinkText
            textStyle={styles.linkText}
            onPress={(): void => {
              navigation.navigate('AuthWebView', PRIVACY_POLICY);
            }}
            text={I18n.t('signUp.privacy')}
          />
          <Text style={styles.agree}>{I18n.t('signUp.agree3')}</Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;
