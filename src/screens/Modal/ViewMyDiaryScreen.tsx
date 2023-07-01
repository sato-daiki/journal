import React, { useCallback, useLayoutEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { Diary, LocalStatus, User } from '@/types';
import MyDiary from '@/components/organisms/MyDiary/MyDiary';
import {
  ModalViewMyDiaryStackNavigationProp,
  ModalViewMyDiaryStackParamList,
} from '@/navigations/ModalNavigator';
import { HeaderText, Layout } from '@/components/atoms';
import I18n from '@/utils/I18n';

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
      <MyDiary
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
