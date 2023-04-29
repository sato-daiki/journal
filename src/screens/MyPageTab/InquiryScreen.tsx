import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { Space, SubmitButton, LoadingModal } from '../../components/atoms';
import { User } from '../../types';
import I18n from '../../utils/I18n';
import { emailValidate } from '../../utils/common';
import {
  primaryColor,
  fontSizeM,
  fontSizeL,
  borderLightColor,
  offWhite,
} from '../../styles/Common';
import { alert } from '../../utils/ErrorAlert';
import {
  MyPageTabNavigationProp,
  MyPageTabStackParamList,
} from '../../navigations/MyPageTabNavigator';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ModalConfirm from '@/components/organisms/ModalConfirm';

export interface Props {
  user: User;
}

type InquiryNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyPageTabStackParamList, 'Inquiry'>,
  MyPageTabNavigationProp
>;

type ScreenType = {
  navigation: InquiryNavigationProp;
} & Props;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: fontSizeM,
    color: primaryColor,
    marginBottom: 8,
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
  thanksTitle: {
    textAlign: 'center',
    fontSize: fontSizeL,
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: 8,
  },
  thanksText: {
    fontSize: fontSizeM,
    textAlign: 'center',
    color: primaryColor,
    lineHeight: fontSizeM * 1.3,
    marginBottom: 32,
  },
});

/**
 * 添削中
 */
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
          <Text style={styles.label}>{I18n.t('inquiry.email')}</Text>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={(text: string): void => setEmail(text)}
            maxLength={50}
            placeholder='Enter your email address'
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            returnKeyType='done'
          />
          <Text style={styles.label}>{I18n.t('inquiry.message')}</Text>
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
          <Text style={styles.thanksTitle}>{I18n.t('inquiry.title')}</Text>
          <Text style={styles.thanksText}>{I18n.t('inquiry.thanks')}</Text>
          <SubmitButton
            title={I18n.t('common.back')}
            onPress={(): void => {
              navigation.goBack();
            }}
          />
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};

export default InquiryScreen;
