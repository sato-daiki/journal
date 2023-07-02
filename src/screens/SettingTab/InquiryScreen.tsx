import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { Layout } from '@/components/templates';
import { Space, SubmitButton, LoadingModal, AppText } from '@/components/atoms';
import { User } from '../../types';
import I18n from '../../utils/I18n';
import { emailValidate } from '../../utils/common';
import {
  primaryColor,
  fontSizeM,
  borderLightColor,
  offWhite,
} from '../../styles/Common';
import { alert } from '../../utils/ErrorAlert';
import {
  SettingTabNavigationProp,
  SettingTabStackParamList,
} from '../../navigations/SettingTabNavigator';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ModalConfirm from '@/components/features/Modal/ModalConfirm';
import EmailTextInput from '@/components/molecules/EmailTextInput';

export interface Props {
  user: User;
}

type InquiryNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SettingTabStackParamList, 'Inquiry'>,
  SettingTabNavigationProp
>;

type ScreenType = {
  navigation: InquiryNavigationProp;
} & Props;

const InquiryScreen: React.FC<ScreenType> = ({ navigation, user }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [isModalError, setIsModalError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const { currentUser } = auth();
    if (currentUser && currentUser.email) {
      setEmail(currentUser.email);
    }
  }, []);

  const checkValidate = useCallback((): boolean => {
    if (email.length === 0) {
      setErrorMessage(I18n.t('errorMessage.emptyEmail'));
      setIsModalError(true);
      return false;
    }

    if (message.length === 0) {
      setErrorMessage(I18n.t('errorMessage.emptyMessage'));
      setIsModalError(true);
      return false;
    }

    if (emailValidate(email)) {
      setErrorMessage(I18n.t('errorMessage.invalidEmail'));
      setIsModalError(true);
      return false;
    }
    return true;
  }, [email, message.length]);

  const onPressSend = useCallback(() => {
    const f = async (): Promise<void> => {
      if (isLoading) return;
      if (!checkValidate()) return;

      setIsLoading(true);
      setIsSuccess(false);

      try {
        await firestore().collection('inquiries').add({
          uid: user.uid,
          email,
          message,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

        setIsLoading(false);
        setIsSuccess(true);
      } catch (err: any) {
        alert({ err });
        setIsLoading(false);
        setIsSuccess(false);
      }
    };
    f();
  }, [checkValidate, email, isLoading, message, user]);

  const onPressCloseError = (): void => {
    setErrorMessage('');
    setIsModalError(false);
  };

  return (
    <Layout>
      <KeyboardAwareScrollView style={styles.container}>
        <LoadingModal visible={isLoading} />
        <ModalConfirm
          visible={isModalError}
          title={I18n.t('common.error')}
          message={errorMessage}
          mainButtonText={I18n.t('common.close')}
          onPressMain={onPressCloseError}
        />
        {!isSuccess ? (
          <View style={styles.main}>
            <AppText size='m'>{I18n.t('inquiry.email')}</AppText>
            <Space size={6} />
            <EmailTextInput value={email} onChangeText={setEmail} />
            <AppText size='m'>{I18n.t('inquiry.message')}</AppText>
            <Space size={6} />
            <TextInput
              style={[styles.textInput, styles.message]}
              multiline
              value={message}
              onChangeText={(text: string): void => setMessage(text)}
              maxLength={500}
              placeholder='Enter your message'
              spellCheck
              autoCorrect
              underlineColorAndroid='transparent'
              returnKeyType='done'
            />
            <Space size={32} />
            <SubmitButton
              title={I18n.t('common.sending')}
              onPress={onPressSend}
            />
          </View>
        ) : (
          <View style={styles.successContainer}>
            <AppText bold size='l' textAlign='center'>
              {I18n.t('inquiry.title')}
            </AppText>
            <Space size={8} />
            <AppText size='m' textAlign='center'>
              {I18n.t('inquiry.thanks')}
            </AppText>
            <Space size={32} />
            <SubmitButton
              title={I18n.t('common.back')}
              onPress={(): void => {
                navigation.goBack();
              }}
            />
          </View>
        )}
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
    padding: 16,
  },
  textInput: {
    width: '100%',
    fontSize: fontSizeM,
    color: primaryColor,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: offWhite,
    borderRadius: 6,
    borderColor: borderLightColor,
    marginBottom: 16,
  },
  message: {
    height: 300,
    textAlignVertical: 'top',
  },
  successContainer: {
    paddingTop: 32,
    paddingHorizontal: 16,
  },
});

export default InquiryScreen;
