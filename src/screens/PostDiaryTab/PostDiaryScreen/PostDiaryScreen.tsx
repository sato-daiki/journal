import React, { useLayoutEffect } from 'react';

import { PostDiary } from '@/components/organisms/PostDiary';
import { HeaderText } from '@/components/atoms';

import I18n from '@/utils/I18n';
import {
  DefaultModalLayoutOptions,
  DefaultNavigationOptions,
} from '@/constants/NavigationOptions';
import { usePostDiary } from './usePostDiary';
import { ScreenType } from './interfaces';

/**
 * 概要：日記投稿画面
 */
const PostDiaryScreen: React.FC<ScreenType> = ({
  navigation,
  route,
  user,
  setUser,
  addDiary,
}) => {
  const {
    isLoadingDraft,
    isLoadingPublish,
    isModalCancel,
    title,
    text,
    errorMessage,
    isModalError,
    onPressCheck,
    onPressCloseModalCancel,
    onChangeTextTitle,
    onChangeTextText,
    onPressDraft,
    onPressNotSave,
    onPressClose,
    onPressCloseError,
  } = usePostDiary({
    navigation,
    route,
    user,
    setUser,
    addDiary,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      ...DefaultNavigationOptions,
      ...DefaultModalLayoutOptions,
      title: I18n.t('postDiary.headerTitle'),
      headerLeft: () => (
        <HeaderText text={I18n.t('common.close')} onPress={onPressClose} />
      ),
      headerRight: () => {
        return (
          <HeaderText text={I18n.t('common.check')} onPress={onPressCheck} />
        );
      },
    });
  }, [navigation, onPressClose, onPressCheck]);

  return (
    <PostDiary
      navigation={navigation}
      isLoading={isLoadingDraft || isLoadingPublish}
      isModalCancel={isModalCancel}
      isModalError={isModalError}
      title={title}
      text={text}
      themeCategory={route?.params?.themeCategory}
      themeSubcategory={route?.params?.themeSubcategory}
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

export default PostDiaryScreen;
