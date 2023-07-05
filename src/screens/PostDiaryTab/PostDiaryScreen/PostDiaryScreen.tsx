import React, { useLayoutEffect } from 'react';

import { PostDiary } from '@/components/features/PostDiary';

import I18n from '@/utils/I18n';
import { usePostDiary } from './usePostDiary';
import { ScreenType } from './interfaces';
import { Layout } from '@/components';
import HeaderText from '@/components/features/Header/HeaderText';

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
  const themeTitle = route?.params?.themeTitle;
  const themeCategory = route?.params?.themeCategory;
  const themeSubcategory = route?.params?.themeSubcategory;

  const {
    isLoadingDraft,
    isLoadingPublish,
    isModalCancel,
    isModalError,
    isImageLoading,
    title,
    text,
    images,
    errorMessage,
    selectedItem,
    onPressCheck,
    onPressCloseModalCancel,
    onChangeTextTitle,
    onChangeTextText,
    onPressChooseImage,
    onPressCamera,
    onPressDeleteImage,
    onPressDraft,
    onPressNotSave,
    onPressClose,
    onPressCloseError,
    onPressItem,
  } = usePostDiary({
    navigation,
    themeTitle,
    themeCategory,
    themeSubcategory,
    user,
    setUser,
    addDiary,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
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
    <Layout>
      <PostDiary
        navigation={navigation}
        isLoading={isLoadingDraft || isLoadingPublish}
        isModalCancel={isModalCancel}
        isModalError={isModalError}
        isImageLoading={isImageLoading}
        title={title}
        text={text}
        images={images}
        themeCategory={route?.params?.themeCategory}
        themeSubcategory={route?.params?.themeSubcategory}
        errorMessage={errorMessage}
        selectedItem={selectedItem}
        onPressCloseModalCancel={onPressCloseModalCancel}
        onChangeTextTitle={onChangeTextTitle}
        onChangeTextText={onChangeTextText}
        onPressChooseImage={onPressChooseImage}
        onPressCamera={onPressCamera}
        onPressDeleteImage={onPressDeleteImage}
        onPressDraft={onPressDraft}
        onPressNotSave={onPressNotSave}
        onPressCloseError={onPressCloseError}
        onPressItem={onPressItem}
      />
    </Layout>
  );
};

export default PostDiaryScreen;
