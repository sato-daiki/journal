import React, { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { LongCode, User } from '@/types';
import {
  AuthNavigationProp,
  AuthStackParamList,
} from '@/navigations/AuthNavigator';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Layout } from '@/components/templates';
import { AppText, Space, SubmitButton } from '@/components/atoms';
import I18n from '@/utils/I18n';
import LanguagePicker from '@/components/molecules/LanguageModalPicker/LanguagePicker';
import { getLanguageToolName } from '@/utils/grammarCheck';
import { PickerItem } from '@/components/molecules/ModalPicker';

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
  const [selectedItem, setSelectedItem] = useState<PickerItem>({
    label: getLanguageToolName('en-US'),
    value: 'en-US',
  });

  const onPressItem = useCallback((item: PickerItem) => {
    setSelectedItem(item);
  }, []);

  const onPressNext = useCallback((): void => {
    setUser({
      ...user,
      learnLanguage: selectedItem.value as LongCode,
    });
    navigation.navigate('SignUp');
  }, [navigation, selectedItem.value, setUser, user]);

  return (
    <Layout innerStyle={styles.contaner}>
      <AppText size='l' bold>
        {I18n.t('selectLanguage.title')}
      </AppText>
      <Space size={16} />
      <LanguagePicker selectedItem={selectedItem} onPressItem={onPressItem} />
      <Space size={32} />
      <SubmitButton title={I18n.t('common.next')} onPress={onPressNext} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
});

export default SelectLanguageScreen;
