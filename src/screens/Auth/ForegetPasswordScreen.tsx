import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';

import ModalSendEmail from '@/components/organisms/ModalSendEmail';
import { CheckTextInput } from '@/components/molecules';
import { Space, SubmitButton, LoadingModal } from '@/components/atoms';

import {
  primaryColor,
  fontSizeM,
  fontSizeL,
  subTextColor,
} from '@/styles/Common';
import I18n from '@/utils/I18n';
import { emailInputError, emailValidate } from '@/utils/common';
import {
  SettingTabStackParamList,
  SettingTabNavigationProp,
} from '@/navigations/SettingTabNavigator';
import auth from '@react-native-firebase/auth';
import { getLanguageToolCode } from '@/utils/grammarCheck';
import { LongCode } from '@/types';

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<SettingTabStackParamList, 'ForegetPassword'>,
  SettingTabNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeL,
    fontWeight: 'bold',
    paddingBottom: 16,
  },
  subText: {
    color: subTextColor,
    fontSize: fontSizeM,
    paddingBottom: 16,
  },
  label: {
    color: primaryColor,
    fontSize: fontSizeM,
    paddingBottom: 6,
  },
});

const ForegetPasswordScreen: React.FC<ScreenType> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const clearErrorMessage = useCallback((): void => {
    setErrorEmail('');
  }, []);

  const onPressSubmit = useCallback(async (): Promise<void> => {
    clearErrorMessage();
    try {
      setIsLoading(true);
      const languageCode = getLanguageToolCode(I18n.locale as LongCode);
      auth().setLanguageCode(languageCode === 'ja' ? 'ja' : 'en');
      await auth().sendPasswordResetEmail(email);
      setIsModal(true);
    } catch (err: any) {
      emailInputError(err, () => undefined, setErrorEmail, clearErrorMessage);
    }
    setIsLoading(false);
  }, [clearErrorMessage, email]);

  const onBlurEmail = useCallback(async (): Promise<void> => {
    if (email.length === 0) {
      setErrorEmail('');
      return;
    }
    if (emailValidate(email)) {
      setErrorEmail(I18n.t('errorMessage.invalidEmail'));
    }
    setErrorEmail('');
  }, [email, setErrorEmail]);

  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onChangeText = useCallback((text: string) => {
    setEmail(text);
  }, []);

  return (
    <View style={styles.container}>
      <LoadingModal visible={isLoading} />
      <ModalSendEmail visible={isModal} onPressClose={onPressClose} />
      <Text style={styles.title}>{I18n.t('foregetPassword.title')}</Text>
      <Text style={styles.subText}>{I18n.t('foregetPassword.subText')}</Text>
      <Text style={styles.label}>{I18n.t('foregetPassword.email')}</Text>
      <CheckTextInput
        value={email}
        onChangeText={onChangeText}
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
      <Space size={32} />
      <SubmitButton
        title={I18n.t('common.sending')}
        onPress={onPressSubmit}
        disable={errorEmail !== '' || email === ''}
      />
      <Space size={16} />
    </View>
  );
};

export default ForegetPasswordScreen;
