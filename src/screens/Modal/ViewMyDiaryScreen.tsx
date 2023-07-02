import React, { useCallback, useLayoutEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { Diary, LocalStatus, User } from '@/types';
import {
  ModalViewMyDiaryStackNavigationProp,
  ModalViewMyDiaryStackParamList,
} from '@/navigations/ModalNavigator';

import { Layout } from '@/components/templates';
import I18n from '@/utils/I18n';
import MyDiaryMain from '@/components/features/MyDiary/MyDiaryMain';
import HeaderText from '@/components/features/Header/HeaderText';

export interface Props {
  diary?: Diary;
  user: User;
  localStatus: LocalStatus;
}

interface DispatchProps {
  editDiary: (objectID: string, diary: Diary) => void;
  setUser: (user: User) => void;
}

export type ViewMyDiaryNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalViewMyDiaryStackParamList, 'ViewMyDiary'>,
  ModalViewMyDiaryStackNavigationProp
>;

type ScreenType = {
  navigation: ViewMyDiaryNavigationProp;
} & Props &
  DispatchProps;

const ViewMyDiaryScreen: React.FC<ScreenType> = ({
  navigation,
  diary,
  localStatus,
  user,
  editDiary,
  setUser,
}) => {
  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: I18n.t('viewMyDiary.headerTitle'),
      headerLeft: () => (
        <HeaderText text={I18n.t('common.close')} onPress={onPressClose} />
      ),
    });
  }, [diary, navigation, onPressClose]);

  if (!diary) {
    return null;
  }

  return (
    <Layout>
      <MyDiaryMain
        isView
        navigation={navigation}
        diary={diary}
        user={user}
        isPremium={localStatus.isPremium}
        editDiary={editDiary}
        setUser={setUser}
      />
    </Layout>
  );
};
export default ViewMyDiaryScreen;
