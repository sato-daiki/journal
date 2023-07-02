import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import {
  emailInputError,
  emailValidate,
  emaillExistCheck,
} from '../../utils/common';
import { CheckTextInput } from '../../components/molecules';
import { Layout } from '@/components/templates';
import { Space, SubmitButton, LoadingModal, AppText } from '@/components/atoms';
import I18n from '../../utils/I18n';
import {
  SettingTabStackParamList,
  SettingTabNavigationProp,
} from '../../navigations/SettingTabNavigator';
import auth from '@react-native-firebase/auth';
import { useAppTheme } from '@/styles/colors';

type RegisterEmailPasswordNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SettingTabStackParamList, 'RegisterEmailPassword'>,
  SettingTabNavigationProp
>;

type ScreenType = {
  navigation: RegisterEmailPasswordNavigationProp;
};

const RegisterEmailPasswordScreen: React.FC<ScreenType> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  const [isEmailCheckOk, setIsEmailCheckOk] = useState(false);

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const theme = useAppTheme();

  const clearErrorMessage = (): void => {
    setErrorEmail('');
    setErrorPassword('');
  };

  const onPressSubmit = useCallback(() => {
    const f = async (): Promise<void> => {
      clearErrorMessage();
      try {
        const { currentUser } = auth();
        if (!currentUser) {
          return;
        }
        setIsLoading(true);
        await currentUser.updateEmail(email);
        await currentUser.updatePassword(password);

        setIsLoading(false);
        navigation.navigate('Setting');
      } catch (err: any) {
        emailInputError(
          err,
          setErrorPassword,
          setErrorEmail,
          clearErrorMessage,
        );
        setIsLoading(false);
      }
      setIsLoading(false);
    };
    f();
  }, [email, navigation, password]);

  const onBlurEmail = useCallback(() => {
    const f = async (): Promise<void> => {
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
    };
    f();
  }, [email, setIsEmailCheckOk, setErrorEmail, setIsEmailLoading]);

  const onBlurPassword = useCallback(() => {
    if (password.length === 0) {
      setErrorPassword('');
    } else if (password.length > 0 && password.length < 6) {
      setErrorPassword(I18n.t('errorMessage.weakPassword'));
    } else {
      setErrorPassword('');
    }
  }, [password, setErrorPassword]);

  return (
    <Layout>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.main}>
          <LoadingModal visible={isLoading} />
          <AppText bold size='l'>
            {I18n.t('registerEmailPassword.title')}
          </AppText>
          <Space size={16} />
          <AppText size='m' color={theme.colors.secondary}>
            {I18n.t('registerEmailPassword.subText')}
          </AppText>
          <Space size={16} />
          <AppText size='m'>{I18n.t('registerEmailPassword.email')}</AppText>
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
            underlineColorAndroid='transparent'
            returnKeyType='done'
            isLoading={isEmailLoading}
            isCheckOk={isEmailCheckOk}
            errorMessage={errorEmail}
          />
          <Space size={16} />
          <AppText size='m'>{I18n.t('registerEmailPassword.password')}</AppText>
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
            underlineColorAndroid='transparent'
            returnKeyType='done'
            errorMessage={errorPassword}
          />
          <Space size={32} />
          <SubmitButton
            title={I18n.t('common.register')}
            onPress={onPressSubmit}
            disable={!isEmailCheckOk}
          />
          <Space size={16} />
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
});

export default RegisterEmailPasswordScreen;
