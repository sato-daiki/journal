import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Layout } from '@/components/templates';
import {
  AppText,
  LinkText,
  LoadingModal,
  Space,
  SubmitButton,
} from '@/components/atoms';
import { Notification } from '@/images';
import { setPushotifications } from '@/utils/Notification';
import { LocalStatus, User } from '@/types';
import I18n from '@/utils/I18n';
import {
  OnboardingNavigationProp,
  OnboardingStackParamList,
} from '@/navigations/OnboardingNavigator';
import { CompositeNavigationProp } from '@react-navigation/native';

export interface Props {
  user: User;
  localStatus: LocalStatus;
}

interface DispatchProps {
  setUser: (user: User) => void;
}

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<OnboardingStackParamList, 'PushSetting'>,
  OnboardingNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp;
} & Props &
  DispatchProps;

const PushSettingScreen: React.FC<ScreenType> = ({
  navigation,
  user,
  localStatus,
  setUser,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onPressSubmit = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    if (localStatus.uid) {
      const expoPushToken = await setPushotifications(localStatus.uid);
      if (expoPushToken) {
        setUser({
          ...user,
          expoPushToken,
        });
      }
    }
    navigation.navigate('ReminderInitialOnboarding');
    setIsLoading(false);
  }, [isLoading, localStatus.uid, navigation, setUser, user]);

  const onPressSkip = useCallback(async () => {
    navigation.navigate('ReminderInitialOnboarding');
  }, [navigation]);

  return (
    <Layout innerStyle={styles.container}>
      <LoadingModal visible={isLoading} />
      <View style={styles.main}>
        <AppText bold size='l' textAlign='center'>
          {I18n.t('pushSetting.title')}
        </AppText>
        <Space size={48} />
        <AppText size='m' textAlign='center'>
          {I18n.t('pushSetting.description')}
        </AppText>
      </View>
      <View style={styles.imgContainer}>
        <Image source={Notification} style={styles.img} />
      </View>
      <View style={styles.linkContainer}>
        <SubmitButton
          title={I18n.t('pushSetting.submit')}
          onPress={onPressSubmit}
        />
        <Space size={16} />
        <LinkText
          size='m'
          textAlign='center'
          text={I18n.t('common.skip')}
          onPress={onPressSkip}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 64,
  },
  main: {
    flex: 1,
  },
  linkContainer: {
    height: 100,
  },
  img: {
    alignSelf: 'center',
    width: 120,
    height: 207,
  },
  imgContainer: {
    flex: 2,
    paddingTop: 16,
  },
});
export default PushSettingScreen;
