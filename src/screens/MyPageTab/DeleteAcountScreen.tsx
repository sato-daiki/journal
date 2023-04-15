import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { auth } from '../../constants/firebase';
import {
  subTextColor,
  fontSizeS,
  offWhite,
  fontSizeM,
  borderLightColor,
  softRed,
} from '../../styles/Common';
import { logAnalytics, events } from '../../utils/Analytics';
import ModalDeleteAcount from '../../components/organisms/ModalDeleteAcount';
import I18n from '../../utils/I18n';
import { alert } from '../../utils/ErrorAlert';
import {
  MyPageTabNavigationProp,
  MyPageTabStackParamList,
} from '../../navigations/MyPageTabNavigator';
import { Hoverable } from '../../components/atoms';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

interface DispatchProps {
  signOut: () => void;
}

type DeleteAcountNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyPageTabStackParamList, 'DeleteAcount'>,
  MyPageTabNavigationProp
>;

type ScreenType = {
  navigation: DeleteAcountNavigationProp;
} & DispatchProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: offWhite,
    paddingTop: 32,
  },
  main: {
    paddingTop: 16,
    borderTopWidth: 0.5,
    borderTopColor: borderLightColor,
    backgroundColor: '#fff',
  },
  text: {
    color: subTextColor,
    fontSize: fontSizeS,
    lineHeight: fontSizeS * 1.3,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    backgroundColor: '#fff',
    height: 48,
    borderTopColor: borderLightColor,
    borderBottomColor: borderLightColor,
  },
  delete: {
    color: softRed,
    fontSize: fontSizeM,
  },
});

const DeleteAcountScreen: React.FC<ScreenType> = ({ signOut }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isPasswordInput, setIsPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const onPressDelete1 = useCallback(() => {
    const f = async (): Promise<void> => {
      try {
        const { currentUser } = auth;
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
        const { currentUser } = auth;
        if (!currentUser || !currentUser.email) return;
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          password,
        );
        setIsLoading(true);
        await reauthenticateWithCredential(currentUser, credential);
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
    <View style={styles.container}>
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
      <View style={styles.main}>
        <Text style={styles.text}>{I18n.t('deleteAcount.text')}</Text>
        <Hoverable
          style={styles.deleteButton}
          onPress={(): void => setIsModal(true)}
        >
          <Text style={styles.delete}>{I18n.t('deleteAcount.withdrawal')}</Text>
        </Hoverable>
      </View>
    </View>
  );
};

export default DeleteAcountScreen;
