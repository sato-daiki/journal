import React, { useCallback, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

import {
  subTextColor,
  fontSizeS,
  fontSizeM,
  fontSizeL,
  mainColor,
} from '../../styles/Common';
import { LocalStatus, LongCode, User } from '../../types';
import {
  SmallButtonWhite,
  HeaderIcon,
  CountryNameWithFlag,
  WhiteButton,
  Space,
  LinkText,
} from '../../components/atoms';
import I18n from '../../utils/I18n';
import {
  MyPageTabStackParamList,
  MyPageTabNavigationProp,
} from '../../navigations/MyPageTabNavigator';
import { getLanguageToolCode } from '@/utils/grammarCheck';
import { cancelEnUrl, cancelJaUrl } from '@/constants/url';

export interface Props {
  user: User;
  localStatus: LocalStatus;
}

interface DispatchProps {
  setUser: (user: User) => void;
}

type MyPageNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyPageTabStackParamList, 'MyPage'>,
  MyPageTabNavigationProp
>;

type ScreenType = {
  navigation: MyPageNavigationProp;
} & Props &
  DispatchProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 16,
  },
  main: {
    paddingHorizontal: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 32,
  },
  label: {
    fontSize: fontSizeS,
    color: subTextColor,
    paddingLeft: 2,
    paddingRight: 16,
  },
  text: {
    fontSize: fontSizeM,
  },
  becomeContainer: {
    marginTop: 16,
    backgroundColor: mainColor,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  becomeTitle: {
    fontSize: fontSizeL,
    fontWeight: 'bold',
    color: '#fff',
    paddingBottom: 16,
  },
  becomeText: {
    fontSize: fontSizeM,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
});

/**
 * マイページ
 */
const MyPageScreen: React.FC<ScreenType> = ({
  navigation,
  user,
  localStatus,
}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderIcon
          icon='material'
          name='settings'
          onPress={(): void => navigation.navigate('Setting')}
        />
      ),
    });
  }, [navigation]);

  const onPressEdit = useCallback(() => {
    navigation.navigate('ModalEditMyProfile', { screen: 'EditMyProfile' });
  }, [navigation]);

  const onPressBecome = useCallback(() => {
    navigation.navigate('ModalBecomePremium', { screen: 'BecomePremium' });
  }, [navigation]);

  const onPressCancel = useCallback(() => {
    const languageCode = getLanguageToolCode(I18n.locale as LongCode);
    if (languageCode === 'ja') {
      Linking.openURL(cancelJaUrl);
    } else {
      Linking.openURL(cancelEnUrl);
    }
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.labelContainer}>
          <MaterialCommunityIcons
            size={14}
            color={subTextColor}
            name='pencil'
          />
          <Text style={styles.label}>{I18n.t('myPage.learn')}</Text>
        </View>
        <View style={styles.valueContainer}>
          <CountryNameWithFlag size={'large'} longCode={user.learnLanguage} />
          <SmallButtonWhite
            title={I18n.t('myPage.editButton')}
            onPress={onPressEdit}
          />
        </View>

        {localStatus.isPremium ? (
          <>
            <View style={styles.labelContainer}>
              <MaterialCommunityIcons
                size={14}
                color={subTextColor}
                name='star'
              />
              <Text style={styles.label}>{I18n.t('myPage.status')}</Text>
            </View>
            <Space size={4} />
            <View style={styles.valueContainer}>
              <Text style={styles.text}>{I18n.t('myPage.premium')}</Text>
              <LinkText
                text={I18n.t('myPage.aboutCancel')}
                onPress={onPressCancel}
              />
            </View>
          </>
        ) : (
          <View style={styles.becomeContainer}>
            <Text style={styles.becomeTitle}>
              {I18n.t('myPage.becomeTitle')}
            </Text>
            <View style={styles.labelContainer}>
              <MaterialCommunityIcons size={16} color={'#fff'} name='check' />
              <Text style={styles.becomeText}>{I18n.t('myPage.props1')}</Text>
            </View>
            <Space size={8} />
            <View style={styles.labelContainer}>
              <MaterialCommunityIcons size={16} color={'#fff'} name='check' />
              <Text style={styles.becomeText}>{I18n.t('myPage.props2')}</Text>
            </View>
            {/*
             <Space size={8} />
            <View style={styles.labelContainer}>
              <MaterialCommunityIcons size={16} color={'#fff'} name='check' />
              <Text style={styles.becomeText}>
                {I18n.t('myPage.becomeLonger')}
              </Text>
            </View> */}
            <Space size={24} />
            <WhiteButton
              containerStyle={{ backgroundColor: '#fff' }}
              title={I18n.t('myPage.becomeButton')}
              onPress={onPressBecome}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default MyPageScreen;
