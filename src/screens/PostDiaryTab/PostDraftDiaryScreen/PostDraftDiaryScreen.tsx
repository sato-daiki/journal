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
    isModalLack,
    isModalAlert,
    isModalCancel,
    isModalError,
    isPublish,
    errorMessage,
    title,
    text,
    publishMessage,
    onPressSubmitModalLack,
    onPressCloseModalLack,
    onPressWatchAdModalLack,
    onPressCloseModalPublish,
    onPressCloseModalCancel,
    onClosePostDiary,
    onChangeTextTitle,
    onChangeTextText,
    onPressSubmit,
    onPressDraft,
    onPressNotSave,
    onPressCloseError,
    onPressPublic,
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
              onPress={onPressPublic}
            />
          );
        }
        return (
          <HeaderText text={I18n.t('common.draft')} onPress={onPressDraft} />
        );
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.points, text, title]);

  const { item } = route.params;

  return (
    <PostDiary
      navigation={navigation}
      isLoading={isInitialLoading || isLoadingDraft || isLoadingPublish}
      isModalLack={isModalLack}
      isModalAlert={isModalAlert}
      isModalCancel={isModalCancel}
      isModalError={isModalError}
      isPublish={isPublish}
      errorMessage={errorMessage}
      title={title}
      text={text}
      themeCategory={item.themeCategory}
      themeSubcategory={item.themeSubcategory}
      publishMessage={publishMessage}
      points={user.points}
      nativeLanguage={user.nativeLanguage}
      learnLanguage={user.learnLanguage}
      onPressSubmitModalLack={onPressSubmitModalLack}
      onPressCloseModalLack={onPressCloseModalLack}
      onPressWatchAdModalLack={onPressWatchAdModalLack}
      onClosePostDiary={onClosePostDiary}
      onPressCloseModalPublish={onPressCloseModalPublish}
      onPressCloseModalCancel={onPressCloseModalCancel}
      onChangeTextTitle={onChangeTextTitle}
      onChangeTextText={onChangeTextText}
      onPressSubmit={onPressSubmit}
      onPressDraft={onPressDraft}
      onPressNotSave={onPressNotSave}
      onPressCloseError={onPressCloseError}
    />
  );
};

export default PostDraftDiaryScreen;
