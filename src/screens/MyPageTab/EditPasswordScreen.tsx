import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackScreenProps } from '@react-navigation/stack';

import { CheckTextInput } from '@/components/molecules';
import {
  Space,
  SubmitButton,
  LoadingModal,
  LinkText,
} from '@/components/atoms';

import I18n from '@/utils/I18n';
import { passwordInputError } from '@/utils/common';
import { primaryColor, fontSizeM } from '@/styles/Common';
import { MyPageTabStackParamList } from '@/navigations/MyPageTabNavigator';
import auth from '@react-native-firebase/auth';

type ScreenType = StackScreenProps<MyPageTabStackParamList, 'EditPassword'>;

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
  label: {
    color: primaryColor,
    fontSize: fontSizeM,
    paddingBottom: 6,
  },
  forgetText: {
    color: primaryColor,
    fontSize: fontSizeM,
    textAlign: 'center',
  },
});

const EditPasswordScreen: React.FC<ScreenType> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [errorCurrentPassword, setErrorCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorNewPassword, setErrorNewPassword] = useState('');

  const clearErrorMessage = (): void => {
    setErrorCurrentPassword('');
    setErrorNewPassword('');
  };

  const onPressSubmit = useCallback(async (): Promise<void> => {
    clearErrorMessage();
    try {
      const { currentUser } = auth();
      if (!currentUser || !currentUser.email) return;
      const credential = auth.EmailAuthProvider.credential(
        currentUser.email,
        currentPassword,
      );
      setIsLoading(true);
      await currentUser.reauthenticateWithCredential(credential);
      await currentUser.updatePassword(newPassword);
      navigation.goBack();
    } catch (err: any) {
      passwordInputError(
        err,
        setErrorCurrentPassword,
        setErrorNewPassword,
        clearErrorMessage,
      );
      setIsLoading(false);
    }
    setIsLoading(false);
  }, [currentPassword, newPassword, navigation]);

  const onEndEditinCurrentPassword = useCallback(() => {
    setErrorCurrentPassword('');
  }, [setErrorCurrentPassword]);

  const onBlurNewPassword = useCallback(() => {
    setErrorNewPassword('');
  }, [setErrorNewPassword]);

  const onPressForegetPassword = useCallback(() => {
    navigation.navigate('ForegetPassword');
  }, [navigation]);

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.main}>
        <LoadingModal visible={isLoading} />
        <Text style={styles.label}>
          {I18n.t('editPassword.currentPassword')}
        </Text>
        <CheckTextInput
          value={currentPassword}
          onChangeText={(text: string): void => setCurrentPassword(text)}
          onBlur={onEndEditinCurrentPassword}
          maxLength={20}
          placeholder='Password'
          autoCapitalize='none'
          autoCorrect={false}
          underlineColorAndroid='transparent'
          secureTextEntry
          returnKeyType='done'
          errorMessage={errorCurrentPassword}
        />
        <Space size={16} />
        <Text style={styles.label}>{I18n.t('editPassword.newPassword')}</Text>
        <CheckTextInput
          value={newPassword}
          onChangeText={(text: string): void => setNewPassword(text)}
          onBlur={onBlurNewPassword}
          maxLength={20}
          placeholder='Password'
          autoCapitalize='none'
          autoCorrect={false}
          underlineColorAndroid='transparent'
          secureTextEntry
          returnKeyType='done'
          errorMessage={errorNewPassword}
        />
        <Space size={32} />
        <SubmitButton
          title={I18n.t('common.register')}
          onPress={onPressSubmit}
          disable={
            errorCurrentPassword !== '' ||
            errorNewPassword !== '' ||
            currentPassword === '' ||
            newPassword === ''
          }
        />
        <Space size={16} />
        <Text style={styles.forgetText}>
          {I18n.t('editPassword.forgetText')}
          <LinkText
            onPress={onPressForegetPassword}
            text={I18n.t('editPassword.link')}
          />
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EditPasswordScreen;
