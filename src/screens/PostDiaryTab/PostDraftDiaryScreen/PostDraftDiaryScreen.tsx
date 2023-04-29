import React, { useLayoutEffect } from 'react';

import { HeaderText } from '@/components/atoms';
import { PostDiary } from '@/components/organisms/PostDiary';

import I18n from '@/utils/I18n';
import {
  DefaultModalLayoutOptions,
  DefaultNavigationOptions,
} from '@/constants/NavigationOptions';
import { usePostDraftDiary } from './usePostDraftDiary';

import {
  ModalPostDraftDiaryStackNavigationProp,
  ModalPostDraftDiaryStackParamList,
} from '@/navigations/ModalNavigator';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Diary, User } from '@/types';

export interface Props {
  user: User;
}

interface DispatchProps {
  setUser: (user: User) => void;
  editDiary: (objectID: string, diary: Diary) => void;
}

export type PostDraftDiaryNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalPostDraftDiaryStackParamList, 'PostDraftDiary'>,
  ModalPostDraftDiaryStackNavigationProp
>;

export type PostDraftDiaryRouteProp = RouteProp<
  ModalPostDraftDiaryStackParamList,
  'PostDraftDiary'
>;

export type ScreenType = {
  navigation: PostDraftDiaryNavigationProp;
  route: PostDraftDiaryRouteProp;
} & Props &
  DispatchProps;

/**
 * 概要：日記投稿画面
 */
const PostDraftDiaryScreen: React.FC<ScreenType> = ({
  navigation,
  route,
  user,
  setUser,
  editDiary,
}) => {
  const {
    isInitialLoading,
    isLoadingPublish,
    isLoadingDraft,
    isModalCancel,
    isModalError,
    title,
    text,
    errorMessage,
    onPressCheck,
    onPressCloseModalCancel,
    onChangeTextTitle,
    onChangeTextText,
    onPressDraft,
    onPressNotSave,
    onPressClose,
    onPressCloseError,
  } = usePostDraftDiary({
    navigation,
    route,
    user,
    setUser,
    editDiary,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      ...DefaultNavigationOptions,
      ...DefaultModalLayoutOptions,
      title: I18n.t('postDraftDiary.headerTitle'),
      headerLeft: () => (
        <HeaderText text={I18n.t('common.close')} onPress={onPressClose} />
      ),
      headerRight: () => {
        return (
          <HeaderText text={I18n.t('common.check')} onPress={onPressCheck} />
        );
      },
    });
  }, [text, title, navigation, onPressClose, onPressDraft, onPressCheck]);

  const { item } = route.params;

  return (
    <PostDiary
      navigation={navigation}
      isLoading={isInitialLoading || isLoadingDraft || isLoadingPublish}
      isModalCancel={isModalCancel}
      isModalError={isModalError}
      title={title}
      text={text}
      themeCategory={item.themeCategory}
      themeSubcategory={item.themeSubcategory}
      learnLanguage={user.learnLanguage}
      errorMessage={errorMessage}
      onPressCloseModalCancel={onPressCloseModalCancel}
      onChangeTextTitle={onChangeTextTitle}
      onChangeTextText={onChangeTextText}
      onPressDraft={onPressDraft}
      onPressNotSave={onPressNotSave}
      onPressCloseError={onPressCloseError}
    />
  );
};

export default PostDraftDiaryScreen;
