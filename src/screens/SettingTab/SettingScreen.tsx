import React, { useCallback, useMemo, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
import { borderLight, useAppTheme } from '@/styles/colors';

import { CountryNameWithFlag, OptionItem } from '../../components/molecules';
import { Layout } from '@/components/templates';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Space, AppText } from '@/components/atoms';
import { logAnalytics, events } from '../../utils/Analytics';
import I18n from '../../utils/I18n';
import { alert } from '../../utils/ErrorAlert';
import { getVersionText } from '../../utils/common';
import {
  SettingTabStackParamList,
  SettingTabNavigationProp,
} from '../../navigations/SettingTabNavigator';

import { LocalStatus, LongCode, User } from '../../types';
import auth from '@react-native-firebase/auth';
import ModalConfirm from '@/components/features/Modal/ModalConfirm';
import {
  HOME_PAGE,
  PRIVACY_POLICY,
  TERMS,
  cancelEnUrl,
  cancelJaUrl,
} from '@/constants/url';
import { SecureStorageKey, StorageKey } from '@/constants/asyncStorage';
import { getLanguageToolCode } from '@/utils/grammarCheck';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';
import OptionItemContainer from '@/components/molecules/OptionItem/OptionItemContainer';

export interface Props {
  user: User;
  localStatus: LocalStatus;
}

interface DispatchProps {
  signOut: () => void;
  setHasPasscode: (hasPasscode: boolean) => void;
}

type SettingNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SettingTabStackParamList, 'Setting'>,
  SettingTabNavigationProp
>;

type ScreenType = {
  navigation: SettingNavigationProp;
} & DispatchProps &
  Props;

/**
 * 設定画面ページ
 */
const SettingScreen: React.FC<ScreenType> = ({
  navigation,
  user,
  localStatus,
  setHasPasscode,
  signOut,
}) => {
  const { currentUser } = auth();
  const [isModalError, setIsModalError] = useState(false);
  const theme = useAppTheme();

  const version = useMemo(() => {
    return getVersionText();
  }, []);

  const onPressLogout = useCallback(async (): Promise<void> => {
    try {
      if (currentUser && currentUser.email) {
        await auth().signOut();
      } else {
        setIsModalError(true);
        return;
      }
      logAnalytics(events.SIGN_OUT);
      signOut();
    } catch (err: any) {
      alert({ err });
    }
  }, [currentUser, signOut]);

  const onChangePasscodeLock = useCallback(
    async (value: boolean) => {
      if (value) {
        navigation.navigate('PasscodeLockSetting');
      } else {
        // 解除する場合
        try {
          await SecureStore.deleteItemAsync(SecureStorageKey.passcode);
          // SettingScreenの描写にはReduxのhasPasscodeを使う
          // RootNatigatorの制御ではAsyncStorageのhasPasscodeを使う
          // なので両方必要
          await AsyncStorage.removeItem(StorageKey.hasPasscode);
          await AsyncStorage.removeItem(StorageKey.isLocalAuthentication);
          setHasPasscode(false);
        } catch (e) {
          Toast.show(I18n.t('passcodeLock.errorRemove'), {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
          });
        }
      }
    },
    [navigation, setHasPasscode],
  );

  const onPressReminder = useCallback(() => {
    if (user.reminder) {
      navigation.navigate('ReminderSelectTimeSetting');
    } else {
      navigation.navigate('ReminderInitialSetting');
    }
  }, [navigation, user.reminder]);

  const onPressCancel = useCallback(() => {
    const languageCode = getLanguageToolCode(I18n.locale as LongCode);
    if (languageCode === 'ja') {
      Linking.openURL(cancelJaUrl);
    } else {
      Linking.openURL(cancelEnUrl);
    }
  }, []);

  return (
    <Layout style={{ backgroundColor: theme.colors.backgroundSetting }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <ModalConfirm
          visible={isModalError}
          title={I18n.t('common.confirmation')}
          message={I18n.t('errorMessage.cantLogout')}
          mainButtonText={I18n.t('common.close')}
          onPressMain={(): void => setIsModalError(false)}
        />
        {localStatus.isPremium ? (
          <OptionItem
            type='nothing'
            isBorrderTop
            title={I18n.t('setting.status')}
            leftIcon={
              <MaterialCommunityIcons
                size={moderateScale(16)}
                color={theme.colors.primary}
                name='star-four-points-outline'
              />
            }
            righComponent={
              <AppText size='m' style={styles.premiumText}>
                {I18n.t('setting.premium')}
              </AppText>
            }
          />
        ) : (
          <OptionItem
            type='right'
            isBorrderTop
            title={I18n.t('setting.aboutPremium')}
            leftIcon={
              <MaterialCommunityIcons
                size={moderateScale(16)}
                color={theme.colors.primary}
                name='star-four-points-outline'
              />
            }
            onPress={(): void => {
              navigation.navigate('ModalBecomePremium', {
                screen: 'BecomePremium',
              });
            }}
          />
        )}
        <Space size={24} />
        <AppText size='s' style={styles.title} color={theme.colors.secondary}>
          {I18n.t('setting.basic')}
        </AppText>
        <Space size={8} />
        <OptionItem
          type='right'
          isBorrderTop
          title={I18n.t('setting.learn')}
          leftIcon={
            <MaterialCommunityIcons
              size={moderateScale(16)}
              color={theme.colors.primary}
              name='pencil-outline'
            />
          }
          righComponent={
            <CountryNameWithFlag
              containerStyle={{ paddingRight: horizontalScale(4) }}
              size={'large'}
              longCode={user.learnLanguage}
            />
          }
          onPress={(): void => {
            navigation.navigate('ModalEditMyProfile', {
              screen: 'EditMyProfile',
            });
          }}
        />
        <OptionItem
          type='switch'
          title={I18n.t('setting.passcodeLock')}
          leftIcon={
            <MaterialCommunityIcons
              size={moderateScale(16)}
              color={theme.colors.primary}
              name='lock-outline'
            />
          }
          switchValue={localStatus.hasPasscode}
          onValueChange={onChangePasscodeLock}
        />
        <OptionItem
          type='right'
          title={I18n.t('setting.reminder')}
          leftIcon={
            <MaterialCommunityIcons
              size={moderateScale(16)}
              color={theme.colors.primary}
              name='bell-outline'
            />
          }
          onPress={onPressReminder}
        />
        {currentUser && currentUser.email ? (
          <>
            <OptionItem
              type='right'
              title={I18n.t('setting.editEmail')}
              leftIcon={
                <MaterialCommunityIcons
                  size={moderateScale(16)}
                  color={theme.colors.primary}
                  name='email-edit-outline'
                />
              }
              onPress={(): void => {
                navigation.navigate('EditEmail');
              }}
            />
            <OptionItem
              type='right'
              title={I18n.t('setting.editPassword')}
              leftIcon={
                <MaterialCommunityIcons
                  size={moderateScale(16)}
                  color={theme.colors.primary}
                  name='briefcase-edit-outline'
                />
              }
              onPress={(): void => {
                navigation.navigate('EditPassword');
              }}
            />
          </>
        ) : (
          <OptionItem
            type='right'
            title={I18n.t('setting.registerEmailPassword')}
            leftIcon={
              <MaterialCommunityIcons
                size={moderateScale(16)}
                color={theme.colors.primary}
                name='email-edit-outline'
              />
            }
            onPress={(): void => {
              navigation.navigate('RegisterEmailPassword');
            }}
          />
        )}
        <Space size={24} />
        <AppText size='s' style={styles.title} color={theme.colors.secondary}>
          {I18n.t('setting.display')}
        </AppText>
        <Space size={8} />
        <OptionItem
          type='right'
          isBorrderTop
          title={I18n.t('setting.darkMode')}
          onPress={(): void => {
            navigation.navigate('Display');
          }}
        />
        {/* <OptionItem
          type='right'
          title={I18n.t('setting.fontSize')}
          onPress={(): void => {
            navigation.navigate('FontSize');
          }}
        /> */}
        <Space size={24} />
        <AppText size='s' style={styles.title} color={theme.colors.secondary}>
          {I18n.t('setting.app')}
        </AppText>
        <Space size={8} />
        <OptionItem
          type='right'
          isBorrderTop
          title={I18n.t('setting.inquiry')}
          onPress={(): void => {
            navigation.navigate('Inquiry');
          }}
        />
        <OptionItem
          type='right'
          title={I18n.t('setting.about')}
          onPress={(): void => {
            navigation.navigate('AboutWebView', HOME_PAGE);
          }}
        />
        <OptionItem
          type='right'
          title={I18n.t('signUp.terms')}
          onPress={(): void => {
            navigation.navigate('AboutWebView', TERMS);
          }}
        />
        <OptionItem
          type='right'
          title={I18n.t('signUp.privacy')}
          onPress={(): void => {
            navigation.navigate('AboutWebView', PRIVACY_POLICY);
          }}
        />
        <Space size={32} />
        <OptionItem
          type='right'
          isBorrderTop
          title={I18n.t('setting.deleteAcount')}
          onPress={(): void => {
            navigation.navigate('DeleteAcount');
          }}
        />
        {localStatus.isPremium && (
          <OptionItem
            type='right'
            title={I18n.t('setting.cancel')}
            onPress={onPressCancel}
          />
        )}
        {currentUser && currentUser.email && (
          <>
            <Space size={32} />
            <OptionItemContainer
              isBorrderTop
              style={styles.logoutButton}
              onPress={onPressLogout}
            >
              <AppText size='m'>{I18n.t('setting.logout')}</AppText>
            </OptionItemContainer>
          </>
        )}
        <Space size={16} />
        <AppText size='s' textAlign='center' color={theme.colors.secondary}>
          {version}
        </AppText>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: verticalScale(32),
  },
  title: {
    paddingLeft: horizontalScale(16),
  },
  premiumText: {
    paddingRight: horizontalScale(4),
  },
  logoutButton: {
    justifyContent: 'center',
  },
});

export default SettingScreen;
