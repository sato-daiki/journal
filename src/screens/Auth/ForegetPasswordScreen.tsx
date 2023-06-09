import React, { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';

import { CheckTextInput } from '@/components/molecules';
import { Space, SubmitButton, LoadingModal, AppText } from '@/components/atoms';
import I18n from '@/utils/I18n';
import { emailInputError, emailValidate } from '@/utils/common';
import {
  SettingTabStackParamList,
  SettingTabNavigationProp,
} from '@/navigations/SettingTabNavigator';
import auth from '@react-native-firebase/auth';
import { getLanguageToolCode } from '@/utils/grammarCheck';
import { LongCode } from '@/types';
import { useAppTheme } from '@/styles/colors';
import { Layout } from '@/components/templates';
import ModalSendEmail from '@/components/features/Modal/ModalSendEmail';
import { horizontalScale, verticalScale } from '@/styles/metrics';

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<SettingTabStackParamList, 'ForegetPassword'>,
  SettingTabNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp;
};

const ForegetPasswordScreen: React.FC<ScreenType> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const theme = useAppTheme();

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
    <Layout innerStyle={styles.container}>
      <LoadingModal visible={isLoading} />
      <ModalSendEmail visible={isModal} onPressClose={onPressClose} />
      <AppText size='l' bold>
        {I18n.t('foregetPassword.title')}
      </AppText>
      <Space size={16} />
      <AppText size='m' color={theme.colors.secondary}>
        {I18n.t('foregetPassword.subText')}
      </AppText>
      <Space size={16} />
      <AppText size='m'>{I18n.t('foregetPassword.email')}</AppText>
      <Space size={6} />
      <CheckTextInput
        value={email}
        onChangeText={onChangeText}
        onBlur={onBlurEmail}
        maxLength={50}
        placeholder='Email'
        keyboardType='email-address'
        autoCapitalize='none'
        autoCorrect={false}
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
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(32),
  },
});

export default ForegetPasswordScreen;
