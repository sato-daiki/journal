import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';

import { HeaderText } from '@/components/atoms';
import { LongCode, User } from '@/types';
import I18n from '@/utils/I18n';
import { MyPageTabNavigationProp } from '@/navigations/MyPageTabNavigator';
import {
  ModalEditMyProfileStackNavigationProp,
  ModalEditMyProfileStackParamList,
} from '@/navigations/ModalNavigator';
import firestore from '@react-native-firebase/firestore';
import { fontSizeL, primaryColor } from '@/styles/Common';
import { getName } from '@/utils/languageTool';
import { PickerItem } from '@/components/molecules/LanguageModalPicker';
import LanguagePicker from '@/components/organisms/LanguagePicker';

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
  navigation: NavigationProp & MyPageTabNavigationProp;
} & Props &
  DispatchProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeL,
    fontWeight: 'bold',
    paddingBottom: 32,
  },
});

/**
 * マイページ編集画面
 */
const EditMyProfileScreen: React.FC<ScreenType> = ({
  user,
  setUser,
  navigation,
}) => {
  const [selectedItem, setSelectedItem] = useState<PickerItem>({
    label: getName(user.learnLanguage),
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
    navigation.navigate('MyPageTab');
  }, [isLoading, navigation, selectedItem.value, setUser, user]);

  const onPressGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
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
    <View style={styles.container}>
      <Text style={styles.title}>{I18n.t('selectLanguage.title')}</Text>
      <LanguagePicker selectedItem={selectedItem} onPressItem={onPressItem} />
    </View>
  );
};

export default EditMyProfileScreen;
