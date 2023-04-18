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
    title,
    text,
    onPressCheck,
    onPressCloseModalCancel,
    onChangeTextTitle,
    onChangeTextText,
    onPressDraft,
    onPressNotSave,
    onPressClose,
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
        if (user.points >= 10) {
          return (
            <HeaderText
              text={I18n.t('common.publish')}
              onPress={onPressCheck}
            />
          );
        }
        return (
          <HeaderText text={I18n.t('common.draft')} onPress={onPressDraft} />
        );
      },
    });
  }, [
    user.points,
    text,
    title,
    navigation,
    onPressClose,
    onPressDraft,
    onPressCheck,
  ]);

  const { item } = route.params;

  return (
    <PostDiary
      navigation={navigation}
      isLoading={isInitialLoading || isLoadingDraft || isLoadingPublish}
      isModalCancel={isModalCancel}
      title={title}
      text={text}
      themeCategory={item.themeCategory}
      themeSubcategory={item.themeSubcategory}
      learnLanguage={user.learnLanguage}
      onPressCloseModalCancel={onPressCloseModalCancel}
      onChangeTextTitle={onChangeTextTitle}
      onChangeTextText={onChangeTextText}
      onPressDraft={onPressDraft}
      onPressNotSave={onPressNotSave}
    />
  );
};

export default PostDraftDiaryScreen;
