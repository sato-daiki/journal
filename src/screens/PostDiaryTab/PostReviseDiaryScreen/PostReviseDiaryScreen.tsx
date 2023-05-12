import React, { useLayoutEffect } from 'react';

import { HeaderText } from '@/components/atoms';
import { PostDiary } from '@/components/organisms/PostDiary';

import I18n from '@/utils/I18n';
import {
  DefaultModalLayoutOptions,
  DefaultNavigationOptions,
} from '@/constants/NavigationOptions';

import {
  ModalPostReviseDiaryStackNavigationProp,
  ModalPostReviseDiaryStackParamList,
} from '@/navigations/ModalNavigator';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Diary, User } from '@/types';
import { usePostReviseDiary } from './usePostReviseDiary';

export interface Props {
  user: User;
}

interface DispatchProps {
  editDiary: (objectID: string, diary: Diary) => void;
}

export type PostReviseDiaryNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalPostReviseDiaryStackParamList, 'PostReviseDiary'>,
  ModalPostReviseDiaryStackNavigationProp
>;

export type PostReviseDiaryRouteProp = RouteProp<
  ModalPostReviseDiaryStackParamList,
  'PostReviseDiary'
>;

export type ScreenType = {
  navigation: PostReviseDiaryNavigationProp;
  route: PostReviseDiaryRouteProp;
} & Props &
  DispatchProps;

const PostReviseDiaryScreen: React.FC<ScreenType> = ({
  navigation,
  route,
  user,
  editDiary,
}) => {
  const { item } = route.params;
  const {
    isInitialLoading,
    isLoadingPublish,
    isModalCancel,
    isModalError,
    title,
    text,
    errorMessage,
    onPressCheck,
    onPressCloseModalCancel,
    onChangeTextTitle,
    onChangeTextText,
    onPressNotSave,
    onPressClose,
    onPressCloseError,
    onPressMyDiary,
  } = usePostReviseDiary({
    navigation,
    item,
    user,
    editDiary,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      ...DefaultNavigationOptions,
      ...DefaultModalLayoutOptions,
      title: I18n.t('postReviseDiary.headerTitle'),
      headerLeft: () => (
        <HeaderText text={I18n.t('common.close')} onPress={onPressClose} />
      ),
      headerRight: () => {
        return (
          <HeaderText text={I18n.t('common.check')} onPress={onPressCheck} />
        );
      },
    });
  }, [text, title, navigation, onPressClose, onPressCheck]);

  return (
    <PostDiary
      navigation={navigation}
      isLoading={isInitialLoading || isLoadingPublish}
      isModalCancel={isModalCancel}
      isModalError={isModalError}
      title={title}
      text={text}
      themeCategory={item.themeCategory}
      themeSubcategory={item.themeSubcategory}
      errorMessage={errorMessage}
      onPressCloseModalCancel={onPressCloseModalCancel}
      onChangeTextTitle={onChangeTextTitle}
      onChangeTextText={onChangeTextText}
      onPressNotSave={onPressNotSave}
      onPressCloseError={onPressCloseError}
      onPressMyDiary={onPressMyDiary}
    />
  );
};

export default PostReviseDiaryScreen;