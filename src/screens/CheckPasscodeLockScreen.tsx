import React, { useCallback, useEffect, useMemo, useState } from 'react';
import I18n from '@/utils/I18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { SecureStorageKey, StorageKey } from '@/constants/asyncStorage';
import * as SecureStore from 'expo-secure-store';
import { LoadingModal } from '@/components/atoms';
import PasscodeLock from '@/components/features/PasscodeLock';
import { User } from '@/types';
import firestore from '@react-native-firebase/firestore';
import { checWithinkHourDiff } from '@/utils/time';
import { Layout } from '@/components/templates';

export interface Props {
  user: User;
}

interface OwnProps {
  temporarilyMovedToBackground: React.MutableRefObject<boolean>;
}

interface DispatchProps {
  setUser: (user: User) => void;
  setShowCheckPasscode: (showCheckPasscode: boolean) => void;
}

const ERROR_MAX_NUM = 10;
const WAIT_HOUR = 24;

const CheckPasscodeLockScreen: React.FC<Props & DispatchProps & OwnProps> = ({
  user,
  temporarilyMovedToBackground,
  setUser,
  setShowCheckPasscode,
}) => {
  const [passcode, setPasscode] = useState('');
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [securePasscode, setSecurePasscode] = useState('');
  const [isForceLock, setIsForceLock] = useState(false);

  const onRest = useCallback(async () => {
    await firestore()
      .doc(`users/${user.uid}`)
      .update({
        passcodeError: {
          count: 0,
          updatedAt: null,
        },
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

    setUser({
      ...user,
      passcodeError: {
        count: 0,
        updatedAt: null,
      },
    });
  }, [setUser, user]);

  useEffect(() => {
    const f = async () => {
      if (!user.passcodeError || user.passcodeError.count < ERROR_MAX_NUM) {
        setIsForceLock(false);
        return;
      }
      const isWithin = checWithinkHourDiff(
        user.passcodeError.updatedAt,
        WAIT_HOUR,
      );
      if (isWithin) {
        setIsForceLock(true);
        return;
      }
      await onRest();
      setIsForceLock(false);
    };
    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const message = useMemo(() => {
    if (isForceLock) {
      return I18n.t('passcodeLock.errorForceLock', {
        hours: WAIT_HOUR,
      });
    } else if (
      user.passcodeError &&
      user.passcodeError.count >= ERROR_MAX_NUM - 5
    ) {
      console.log('user.passcodeError ');
      return I18n.t('passcodeLock.errorMultiple', {
        num: ERROR_MAX_NUM - user.passcodeError.count,
      });
    }
  }, [isForceLock, user.passcodeError]);

  const checkLocalAuthentication = useCallback(async () => {
    const isLocalAuthentication = await AsyncStorage.getItem(
      StorageKey.isLocalAuthentication,
    );
    if (isLocalAuthentication) {
      temporarilyMovedToBackground.current = true;
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        return true;
      }
    }
    return false;
  }, [temporarilyMovedToBackground]);

  const getSecurePasscode = useCallback(async () => {
    const newSecurePasscode = await SecureStore.getItemAsync(
      SecureStorageKey.passcode,
    );

    if (newSecurePasscode) {
      setSecurePasscode(newSecurePasscode);
    } else {
      console.warn('err1');
    }
  }, []);

  const onSuccess = useCallback(async () => {
    setTimeout(() => {
      setShowCheckPasscode(false);
    }, 200);
    if (user.passcodeError && user.passcodeError.count > 0) {
      await onRest();
    }
  }, [onRest, setShowCheckPasscode, user.passcodeError]);

  useEffect(() => {
    const f = async () => {
      try {
        const result = await checkLocalAuthentication();
        if (result) {
          await onSuccess();
        } else {
          await getSecurePasscode();
        }
        setIsInitialLoading(false);
      } catch (err) {
        console.warn('err2', err);
      }
    };

    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCheck = useCallback(
    async (passcode: string) => {
      if (passcode === securePasscode) {
        // 成功
        await onSuccess();
        return true;
      }
      // 以下失敗の処理

      let newPasscodeErrorNum;
      if (!user.passcodeError) {
        // 初回の場合 1
        newPasscodeErrorNum = 1;
      } else {
        // 24時間以内かチェックする
        const isWithin = checWithinkHourDiff(
          user.passcodeError.updatedAt,
          WAIT_HOUR,
        );
        newPasscodeErrorNum = isWithin ? user.passcodeError.count + 1 : 1;
      }

      await firestore()
        .doc(`users/${user.uid}`)
        .update({
          passcodeError: {
            count: newPasscodeErrorNum,
            updatedAt: firestore.FieldValue.serverTimestamp(),
          },
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

      setUser({
        ...user,
        passcodeError: {
          count: newPasscodeErrorNum,
          updatedAt: firestore.Timestamp.now(),
        },
      });
      if (newPasscodeErrorNum >= ERROR_MAX_NUM) {
        setIsForceLock(true);
      }
      return false;
    },
    [onSuccess, securePasscode, setUser, user],
  );

  return (
    <Layout>
      <LoadingModal visible={isInitialLoading} />
      <PasscodeLock
        disabled={isForceLock}
        passcode={passcode}
        setPasscode={setPasscode}
        message={message}
        title={I18n.t('passcodeLock.input')}
        onCheck={onCheck}
      />
    </Layout>
  );
};

export default CheckPasscodeLockScreen;
