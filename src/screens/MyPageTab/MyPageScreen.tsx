import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { primaryColor, subTextColor, fontSizeS } from '../../styles/Common';
import { User } from '../../types';
import {
  SmallButtonWhite,
  Space,
  HeaderIcon,
  CountryNameWithFlag,
} from '../../components/atoms';
import I18n from '../../utils/I18n';
import {
  MyPageTabStackParamList,
  MyPageTabNavigationProp,
} from '../../navigations/MyPageTabNavigator';
import { getName } from '@/utils/spellChecker';

export interface Props {
  user: User;
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
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  label: {
    fontSize: fontSizeS,
    color: subTextColor,
    paddingLeft: 2,
    paddingRight: 16,
  },
  language: {
    fontSize: fontSizeS,
    color: primaryColor,
    marginRight: 8,
  },
});

/**
 * マイページ
 */
const MyPageScreen: React.FC<ScreenType> = ({ navigation, user }) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderIcon
          icon='material'
          name='settings'
          onPress={(): void => navigation.navigate('Setting')}
        />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressEdit = useCallback(() => {
    navigation.navigate('ModalEditMyProfile', { screen: 'EditMyProfile' });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.languageContainer}>
          <MaterialCommunityIcons
            size={14}
            color={subTextColor}
            name='pencil'
          />
          <Text style={styles.label}>{I18n.t('profileLanguage.learn')}</Text>
          <CountryNameWithFlag size={'large'} longCode={user.learnLanguage} />
        </View>
        <Space size={16} />
        <SmallButtonWhite
          title={I18n.t('myPage.editButton')}
          onPress={onPressEdit}
        />
      </View>
    </ScrollView>
  );
};

export default MyPageScreen;
