import React, { useLayoutEffect } from 'react';

import { PostDiary } from '@/components/features/PostDiary';

import I18n from '@/utils/I18n';
import { usePostDraftDiary } from './usePostDraftDiary';

import {
  ModalPostDraftDiaryStackNavigationProp,
  ModalPostDraftDiaryStackParamList,
} from '@/navigations/ModalNavigator';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Diary, User } from '@/types';
import { Layout } from '@/components';
import HeaderText from '@/components/features/Header/HeaderText';

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

const PostDraftDiaryScreen: React.FC<ScreenType> = ({
  navigation,
  route,
  user,
  setUser,
  editDiary,
}) => {
  const { item } = route.params;
  const {
    isInitialLoading,
    isLoadingPublish,
    isLoadingDraft,
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
  } = usePostDraftDiary({
    navigation,
    item,
    user,
    setUser,
    editDiary,
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
  }, [text, title, navigation, onPressClose, onPressDraft, onPressCheck]);

  return (
    <Layout>
      <PostDiary
        navigation={navigation}
        isLoading={isInitialLoading || isLoadingDraft || isLoadingPublish}
        isModalCancel={isModalCancel}
        isModalError={isModalError}
        isImageLoading={isImageLoading}
        title={title}
        text={text}
        images={images}
        themeCategory={item.themeCategory}
        themeSubcategory={item.themeSubcategory}
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

export default PostDraftDiaryScreen;
