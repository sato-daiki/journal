import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Layout } from '@/components/templates';
import { AppText, LinkText, SubmitButton } from '@/components/atoms';
import { AuthStackParamList } from '@/navigations/AuthNavigator';
import { Logo } from '@/images';
import { logAnalytics, events } from '@/utils/Analytics';
import I18n from '@/utils/I18n';

type ScreenType = StackScreenProps<AuthStackParamList, 'Initialize'>;

/**
 * 概要：ログインしていないユーザの立ち上げ画面
 */
const InitializeScreen: React.FC<ScreenType> = ({ navigation }) => {
  useEffect((): void => {
    logAnalytics(events.OPENED_INITIALIZE);
  }, []);

  const onPressSignIn = useCallback((): void => {
    navigation.navigate('SignIn');
  }, [navigation]);

  const onPressSignUp = useCallback((): void => {
    navigation.navigate('SelectLanguage');
  }, [navigation]);

  return (
    <Layout>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={Logo} />
      </View>
      <View style={styles.footer}>
        <SubmitButton
          title={I18n.t('initialize.start')}
          onPress={onPressSignUp}
        />
        <View style={styles.row}>
          <AppText size='m'>{I18n.t('initialize.acount')}</AppText>
          <LinkText
            size='s'
            onPress={onPressSignIn}
            text={I18n.t('initialize.link')}
          />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 200,
    height: 200,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 32,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    paddingTop: 16,
    alignItems: 'center',
  },
});

export default InitializeScreen;
