import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { logAnalytics, events } from '../../utils/Analytics';
import I18n from '../../utils/I18n';
import { alert } from '../../utils/ErrorAlert';
import {
  SettingTabNavigationProp,
  SettingTabStackParamList,
} from '../../navigations/SettingTabNavigator';
import auth from '@react-native-firebase/auth';
import { Layout } from '@/components/templates';
import { AppText, Space, WhiteButton } from '@/components/atoms';
import { useAppTheme } from '@/styles/colors';
import ModalDeleteAcount from '@/components/features/Modal/ModalDeleteAcount';

interface DispatchProps {
  signOut: () => void;
}

type DeleteAcountNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SettingTabStackParamList, 'DeleteAcount'>,
  SettingTabNavigationProp
>;

type ScreenType = {
  navigation: DeleteAcountNavigationProp;
} & DispatchProps;

const DeleteAcountScreen: React.FC<ScreenType> = ({ signOut }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isPasswordInput, setIsPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const theme = useAppTheme();

  const onPressDelete1 = useCallback(() => {
    const f = async (): Promise<void> => {
      try {
        const { currentUser } = auth();
        if (!currentUser) {
          signOut();
          return;
        }
        if (!currentUser.email) {
          // メールアドレスを登録していないユーザの場合→そのまま削除
          setIsLoading(true);
          await currentUser.delete();
          signOut();
        } else {
          // メールアドレスを登録しているユーザの場合→パスワード入力に切り替える
          setIsPasswordInput(true);
        }
      } catch (err: any) {
        setIsLoading(false);
        alert({ err });
      }
      setIsLoading(false);
      logAnalytics(events.DELETED_USER);
    };
    f();
  }, [signOut]);

  const onPressDelete2 = useCallback(() => {
    const f = async (): Promise<void> => {
      try {
        const { currentUser } = auth();
        if (!currentUser || !currentUser.email) return;
        const credential = auth.EmailAuthProvider.credential(
          currentUser.email,
          password,
        );
        setIsLoading(true);
        await currentUser.reauthenticateWithCredential(credential);
        await currentUser.delete();
        signOut();
      } catch (err: any) {
        setIsLoading(false);
        const errorCode = err.code;
        if (errorCode === 'auth/wrong-password') {
          setErrorPassword(I18n.t('errorMessage.wrongPassword'));
        } else {
          setErrorPassword('');
          alert({ err });
        }
      }
      logAnalytics(events.DELETED_USER);
      setIsLoading(false);
    };
    f();
  }, [password, signOut]);

  const onBlurPassword = useCallback(() => {
    setErrorPassword('');
  }, [setErrorPassword]);

  const onPressClose = useCallback(() => {
    setIsPasswordInput(false);
    setIsModal(false);
    setPassword('');
    setErrorPassword('');
  }, []);

  return (
    <Layout innerStyle={styles.container}>
      <ModalDeleteAcount
        visible={isModal}
        isPasswordInput={isPasswordInput}
        isLoading={isLoading}
        password={password}
        errorMessage={errorPassword}
        onChangeText={(txt: string): void => setPassword(txt)}
        onPressDelete1={onPressDelete1}
        onPressDelete2={onPressDelete2}
        onBlur={onBlurPassword}
        onPressClose={onPressClose}
      />
      <AppText size='m'>{I18n.t('deleteAcount.text')}</AppText>
      <Space size={32} />
      <WhiteButton
        containerStyle={{ borderColor: theme.colors.danger }}
        textStyle={{ color: theme.colors.danger }}
        title={I18n.t('deleteAcount.withdrawal')}
        onPress={(): void => setIsModal(true)}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingHorizontal: 16,
  },
});

export default DeleteAcountScreen;
