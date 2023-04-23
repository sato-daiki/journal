import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import {
  emailInputError,
  emailValidate,
  emaillExistCheck,
} from '../../utils/common';
import { CheckTextInput } from '../../components/molecules';
import { Space, SubmitButton, LoadingModal } from '../../components/atoms';
import { primaryColor, fontSizeM, fontSizeL } from '../../styles/Common';
import I18n from '../../utils/I18n';
import {
  MyPageTabStackParamList,
  MyPageTabNavigationProp,
} from '../../navigations/MyPageTabNavigator';
import auth from '@react-native-firebase/auth';

type EditEmailNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyPageTabStackParamList, 'EditEmail'>,
  MyPageTabNavigationProp
>;

type ScreenType = {
  navigation: EditEmailNavigationProp;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
  },
  label: {
    color: primaryColor,
    fontSize: fontSizeM,
    paddingBottom: 6,
  },
});

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
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.main}>
        <LoadingModal visible={isLoading} />
        <Text style={styles.title}>{I18n.t('editEmail.title')}</Text>
        <Text style={styles.label}>{I18n.t('editEmail.labelEmail')}</Text>
        <CheckTextInput
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
        <Text style={styles.label}>{I18n.t('editEmail.labelPassword')}</Text>
        <CheckTextInput
          value={password}
          onChangeText={(text: string): void => setPassword(text)}
          onBlur={onBlurPassword}
          maxLength={20}
          placeholder='Password'
          autoCapitalize='none'
          autoCorrect={false}
          underlineColorAndroid='transparent'
          secureTextEntry
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
  );
};

export default EditEmailScreen;
