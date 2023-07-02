import React, { useCallback, useState, useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';

import { Layout } from '@/components/templates';
import { AppText, Space } from '@/components';
import { LongCode, User } from '@/types';
import I18n from '@/utils/I18n';
import { SettingTabNavigationProp } from '@/navigations/SettingTabNavigator';
import {
  ModalEditMyProfileStackNavigationProp,
  ModalEditMyProfileStackParamList,
} from '@/navigations/ModalNavigator';
import firestore from '@react-native-firebase/firestore';
import { getLanguageToolName } from '@/utils/grammarCheck';
import LanguagePicker from '@/components/molecules/LanguageModalPicker/LanguagePicker';
import { PickerItem } from '@/components/molecules/ModalPicker';
import HeaderText from '@/components/features/Header/HeaderText';

export interface Props {
  user: User;
}

interface DispatchProps {
  setUser: (user: User) => void;
}

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalEditMyProfileStackParamList, 'EditMyProfile'>,
  ModalEditMyProfileStackNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp & SettingTabNavigationProp;
} & Props &
  DispatchProps;

/**
 * マイページ編集画面
 */
const EditMyProfileScreen: React.FC<ScreenType> = ({
  user,
  setUser,
  navigation,
}) => {
  const [selectedItem, setSelectedItem] = useState<PickerItem>({
    label: getLanguageToolName(user.learnLanguage),
    value: user.learnLanguage,
  });

  const onPressItem = useCallback((item: PickerItem) => {
    setSelectedItem(item);
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const onPressSubmit = useCallback(async (): Promise<void> => {
    if (isLoading) return;

    setIsLoading(true);

    await firestore().doc(`users/${user.uid}`).update({
      learnLanguage: selectedItem.value,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });

    setIsLoading(false);
    setUser({
      ...user,
      learnLanguage: selectedItem.value as LongCode,
    });
    //@ts-ignore
    navigation.navigate('SettingTab');
  }, [isLoading, navigation, selectedItem.value, setUser, user]);

  const onPressGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderText text={I18n.t('common.close')} onPress={onPressGoBack} />
      ),
      headerRight: () => (
        <HeaderText text={I18n.t('common.done')} onPress={onPressSubmit} />
      ),
    });
  }, [navigation, onPressGoBack, onPressSubmit]);

  return (
    <Layout innerStyle={styles.container}>
      <AppText size='l' bold>
        {I18n.t('selectLanguage.title')}
      </AppText>
      <Space size={32} />
      <LanguagePicker selectedItem={selectedItem} onPressItem={onPressItem} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 32,
  },
});

export default EditMyProfileScreen;
