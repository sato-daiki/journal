import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { User } from '@/types';
import {
  AuthNavigationProp,
  AuthStackParamList,
} from '@/navigations/AuthNavigator';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Space, SubmitButton } from '@/components/atoms';

import { primaryColor, fontSizeL } from '@/styles/Common';
import I18n from '@/utils/I18n';
import LanguageRadioboxes from '@/components/organisms/LanguageRadioboxes';
import { Language } from '@/types/profile';

export interface Props {
  user: User;
}

interface DispatchProps {
  setUser: (user: User) => void;
}

export type SelectLanguageNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamList, 'SelectLanguage'>,
  AuthNavigationProp
>;

export type ScreenType = {
  navigation: SelectLanguageNavigationProp;
} & Props &
  DispatchProps;

/**
 * 概要：学びたい言語とネイティブの言語の登録
 */
const SelectLanguageScreen: React.FC<ScreenType> = ({
  navigation,
  user,
  setUser,
}) => {
  const [learnLanguage, setLearnLanguage] = useState<Language>('en');

  const onPressNext = useCallback((): void => {
    setUser({
      ...user,
      learnLanguage,
    });
    navigation.navigate('SignUp');
  }, [learnLanguage, navigation, setUser, user]);

  return (
    <View style={styles.contaner}>
      <Text style={styles.title}>{I18n.t('selectLanguage.title')}</Text>
      <LanguageRadioboxes
        learnLanguage={learnLanguage}
        setLearnLanguage={setLearnLanguage}
      />
      <Space size={32} />
      <SubmitButton title={I18n.t('common.next')} onPress={onPressNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingTop: 32,
    alignItems: Platform.OS === 'web' ? 'center' : 'flex-start',
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeL,
    fontWeight: 'bold',
    paddingBottom: 16,
  },
});

export default SelectLanguageScreen;
