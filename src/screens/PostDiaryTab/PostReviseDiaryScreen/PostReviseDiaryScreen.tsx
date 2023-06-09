import React, { useLayoutEffect } from 'react';

import { Layout } from '@/components';
import { PostDiary } from '@/components/features/PostDiary';

import I18n from '@/utils/I18n';

import {
  ModalPostReviseDiaryStackNavigationProp,
  ModalPostReviseDiaryStackParamList,
} from '@/navigations/ModalNavigator';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Diary, User } from '@/types';
import { usePostReviseDiary } from './usePostReviseDiary';
import HeaderText from '@/components/features/Header/HeaderText';

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
    isImageLoading,
    title,
    text,
    images,
    errorMessage,
    onPressCheck,
    onPressCloseModalCancel,
    onChangeTextTitle,
    onChangeTextText,
    onPressChooseImage,
    onPressCamera,
    onPressDeleteImage,
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
    <Layout>
      <PostDiary
        navigation={navigation}
        isLoading={isInitialLoading || isLoadingPublish}
        isModalCancel={isModalCancel}
        isModalError={isModalError}
        isImageLoading={isImageLoading}
        title={title}
        text={text}
        images={images}
        themeCategory={item.themeCategory}
        themeSubcategory={item.themeSubcategory}
        errorMessage={errorMessage}
        onPressCloseModalCancel={onPressCloseModalCancel}
        onChangeTextTitle={onChangeTextTitle}
        onChangeTextText={onChangeTextText}
        onPressChooseImage={onPressChooseImage}
        onPressCamera={onPressCamera}
        onPressDeleteImage={onPressDeleteImage}
        onPressNotSave={onPressNotSave}
        onPressCloseError={onPressCloseError}
        onPressMyDiary={onPressMyDiary}
      />
    </Layout>
  );
};

export default PostReviseDiaryScreen;
