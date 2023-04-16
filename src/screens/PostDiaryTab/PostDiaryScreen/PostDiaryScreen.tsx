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
    isLoadingPublish,
    isLoadingDraft,
    isModalLack,
    isModalAlert,
    isModalCancel,
    isModalError,
    isPublish,
    isTutorialLoading,
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
    onPressTutorial,
    onPressCloseError,
    onPressPublic,
    onPressClose,
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

  return (
    <PostDiary
      navigation={navigation}
      isLoading={isLoadingDraft || isLoadingPublish}
      isModalLack={isModalLack}
      isModalAlert={isModalAlert}
      isModalCancel={isModalCancel}
      isModalError={isModalError}
      isPublish={isPublish}
      isTutorialLoading={isTutorialLoading}
      tutorialPostDiary={user.tutorialPostDiary}
      errorMessage={errorMessage}
      title={title}
      text={text}
      themeCategory={route?.params?.themeCategory}
      themeSubcategory={route?.params?.themeSubcategory}
      publishMessage={publishMessage}
      points={user.points}
      learnLanguage={user.learnLanguage}
      onPressSubmitModalLack={onPressSubmitModalLack}
      onPressCloseModalLack={onPressCloseModalLack}
      onPressWatchAdModalLack={onPressWatchAdModalLack}
      onPressCloseModalPublish={onPressCloseModalPublish}
      onPressCloseModalCancel={onPressCloseModalCancel}
      onClosePostDiary={onClosePostDiary}
      onChangeTextTitle={onChangeTextTitle}
      onChangeTextText={onChangeTextText}
      onPressSubmit={onPressSubmit}
      onPressDraft={onPressDraft}
      onPressNotSave={onPressNotSave}
      onPressTutorial={onPressTutorial}
      onPressCloseError={onPressCloseError}
    />
  );
};

export default PostDiaryScreen;
