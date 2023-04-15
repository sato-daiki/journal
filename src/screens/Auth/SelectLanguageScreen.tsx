import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Profile } from '@/types';
import {
  AuthNavigationProp,
  AuthStackParamList,
} from '@/navigations/AuthNavigator';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Language, languages } from '@/types';
import { RadioBox, Space, SubmitButton } from '@/components/atoms';

import { primaryColor, fontSizeL, mainColor } from '@/styles/Common';
import I18n from '@/utils/I18n';

export interface Props {
  profile: Profile;
}

interface DispatchProps {
  setProfile: (profile: Profile) => void;
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
  profile,
  setProfile,
}) => {
  const [learnLanguage, setLearnLanguage] = useState<Language>('en');

  const onPressNext = useCallback((): void => {
    setProfile({
      ...profile,
      learnLanguage,
    });
    navigation.navigate('SignUp');
  }, []);

  return (
    <View style={styles.contaner}>
      <Text style={styles.title}>{I18n.t('selectLanguage.title')}</Text>
      <View style={styles.radioBoxWrapper}>
        {languages.map((language, index) => (
          <View key={index} style={styles.radioBox}>
            <RadioBox
              checked={learnLanguage === language}
              color={mainColor}
              text={I18n.t(`language.${language}`)}
              onPress={(): void => setLearnLanguage(language)}
            />
          </View>
        ))}
      </View>
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
  radioBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  radioBox: {
    marginRight: 8,
    marginBottom: 8,
  },
});

export default SelectLanguageScreen;
