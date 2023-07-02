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
import { CheckTextInput } from '@/components/molecules';
import I18n from '../../utils/I18n';
import {
  SettingTabStackParamList,
  SettingTabNavigationProp,
} from '../../navigations/SettingTabNavigator';
import auth from '@react-native-firebase/auth';
import { AppText, LoadingModal, Space, SubmitButton } from '@/components/atoms';
import { Layout } from '@/components/templates';

type EditEmailNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SettingTabStackParamList, 'EditEmail'>,
  SettingTabNavigationProp
>;

type ScreenType = {
  navigation: EditEmailNavigationProp;
};

const EditEmailScreen: React.FC<ScreenType> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isEmailCheckOk, setIsEmailCheckOk] = useState(false);
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const clearErrorMessage = (): void => {
    setErrorEmail('');
    setErrorPassword('');
  };

  const onPressSubmit = useCallback(() => {
    const f = async (): Promise<void> => {
      clearErrorMessage();
      try {
        const { currentUser } = auth();
        if (!currentUser || !currentUser.email) return;
        const credential = auth.EmailAuthProvider.credential(
          currentUser.email,
          password,
        );
        setIsLoading(true);
        await currentUser.reauthenticateWithCredential(credential);
        await currentUser.updateEmail(email);
        navigation.goBack();
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
  }, [password, email, navigation]);

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
    setErrorPassword('');
  }, [setErrorPassword]);

  return (
    <Layout>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.main}>
          <LoadingModal visible={isLoading} />
          <AppText bold size='l'>
            {I18n.t('editEmail.title')}
          </AppText>
          <Space size={16} />
          <AppText size='m'>{I18n.t('editEmail.labelEmail')}</AppText>
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
          <AppText size='m'>{I18n.t('editEmail.labelPassword')}</AppText>
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

export default EditEmailScreen;
