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
  Layout,
  AppText,
} from '@/components/atoms';

import I18n from '@/utils/I18n';
import { passwordInputError } from '@/utils/common';
import { primaryColor, fontSizeM } from '@/styles/Common';
import { SettingTabStackParamList } from '@/navigations/SettingTabNavigator';
import auth from '@react-native-firebase/auth';

type ScreenType = StackScreenProps<SettingTabStackParamList, 'EditPassword'>;

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
    <Layout>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.main}>
          <LoadingModal visible={isLoading} />
          <AppText size='m'>{I18n.t('editPassword.currentPassword')}</AppText>
          <Space size={6} />
          <CheckTextInput
            isPassword
            value={currentPassword}
            onChangeText={setCurrentPassword}
            onBlur={onEndEditinCurrentPassword}
            maxLength={20}
            placeholder='Password'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            returnKeyType='done'
            errorMessage={errorCurrentPassword}
          />
          <Space size={16} />
          <AppText size='m'>{I18n.t('editPassword.newPassword')}</AppText>
          <Space size={6} />
          <CheckTextInput
            isPassword
            value={newPassword}
            onChangeText={setNewPassword}
            onBlur={onBlurNewPassword}
            maxLength={20}
            placeholder='Password'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            returnKeyType='done'
            errorMessage={errorNewPassword}
          />
          <Space size={32} />
          <View style={styles.footer}>
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
            <View style={styles.row}>
              <AppText size='m'>{I18n.t('editPassword.forgetText')}</AppText>
              <LinkText
                size='m'
                text={I18n.t('editPassword.link')}
                onPress={onPressForegetPassword}
              />
            </View>
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
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  footer: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default EditPasswordScreen;
