import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import ImageView from 'react-native-image-viewing';
import I18n from '@/utils/I18n';

import { AppText, LoadingModal } from '@/components';
// @ts-ignore
import PostDiaryKeyboard from './PostDiaryKeyboard';
import { PostDiaryProps } from './interface';
import { MAX_TEXT, MAX_TITLE, getIsTopic } from '@/utils/diary';
import { TopicCategory, TopicSubcategory } from '@/types';
import ImageViewFooter from '../../molecules/ImageViewFooter';
import LanguageModalPicker from '@/components/molecules/LanguageModalPicker';
import { borderLight, softRed, useAppTheme } from '@/styles/colors';
import ModalConfirm from '../Modal/ModalConfirm';
import ModalDiaryCancel from '../Modal/ModalDiaryCancel';

const PostDiary: React.FC<PostDiaryProps> = ({
  navigation,
  isLoading,
  isModalCancel,
  isModalError,
  isImageLoading,
  title,
  text,
  images,
  themeCategory,
  themeSubcategory,
  errorMessage,
  selectedItem,
  onPressCloseModalCancel,
  onChangeTextTitle,
  onChangeTextText,
  onPressChooseImage,
  onPressCamera,
  onPressDeleteImage,
  onPressDraft,
  onPressMyDiary,
  onPressNotSave,
  onPressCloseError,
  onPressItem,
}) => {
  const theme = useAppTheme();
  const [isForce, setIsForce] = useState(false);
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));

  const [isImageView, setIsImageView] = useState(false);
  const [imageIndex, setImageIndex] = useState<number>(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      easing: Easing.back(1),
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const isTopic = useMemo(() => {
    return getIsTopic(themeCategory, themeSubcategory);
  }, [themeCategory, themeSubcategory]);

  const onFocusText = useCallback((): void => {
    setFadeAnim(new Animated.Value(0));
    setIsForce(true);
  }, []);

  const onBlurText = useCallback((): void => setIsForce(false), []);

  const onPressTopicGuide = useCallback(() => {
    if (isTopic) {
      // 注意: pushじゃないとだめ
      navigation.push('ModalTopicGuide', {
        screen: 'TopicGuide',
        params: {
          topicCategory: themeCategory as TopicCategory,
          topicSubcategory: themeSubcategory as TopicSubcategory,
          caller: 'PostDiary',
        },
      });
    }
  }, [isTopic, navigation, themeCategory, themeSubcategory]);

  const onPressImage = useCallback((index: number) => {
    setIsImageView(true);
    setImageIndex(index);
  }, []);

  const onCloseImageView = useCallback(() => {
    setIsImageView(false);
    setImageIndex(0);
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundOff },
      ]}
    >
      <LoadingModal visible={isLoading} />
      <ModalConfirm
        visible={isModalError}
        title={I18n.t('common.error')}
        message={errorMessage}
        mainButtonText={I18n.t('common.close')}
        onPressMain={onPressCloseError}
      />
      <ModalDiaryCancel
        visible={isModalCancel}
        isLoading={isLoading}
        onPressSave={onPressDraft}
        onPressNotSave={onPressNotSave}
        onPressClose={onPressCloseModalCancel}
      />
      {images && images.length > 0 && (
        <ImageView
          visible={isImageView}
          imageIndex={imageIndex}
          images={images.map((i) => ({ uri: i.imageUrl }))}
          onRequestClose={onCloseImageView}
          FooterComponent={({ imageIndex }) => (
            <ImageViewFooter total={images.length} imageIndex={imageIndex} />
          )}
        />
      )}
      <View style={styles.header}>
        <View style={styles.left}>
          <View style={styles.title}>
            <AppText size='ss' style={styles.headerLabel}>
              {I18n.t('postDiaryComponent.titleLength')}
            </AppText>
            <AppText
              size='ss'
              color={
                !themeCategory && !themeSubcategory && title.length > MAX_TITLE
                  ? softRed
                  : theme.colors.primary
              }
              style={[styles.headerValue]}
            >
              {title.length}
            </AppText>
          </View>
          <AppText size='ss' style={styles.headerLabel}>
            {I18n.t('postDiaryComponent.textLength')}
          </AppText>
          <AppText
            size='ss'
            color={text.length > MAX_TEXT ? softRed : theme.colors.primary}
            style={[styles.headerValue]}
          >
            {text.length}
          </AppText>
        </View>
        {(!themeCategory || !themeSubcategory) &&
          !!selectedItem &&
          !!onPressItem && (
            <View style={styles.right}>
              <LanguageModalPicker
                size={'small'}
                selectedItem={selectedItem}
                onPressItem={onPressItem}
              />
            </View>
          )}
      </View>
      <PostDiaryKeyboard
        title={title}
        text={text}
        images={images}
        themeCategory={themeCategory}
        themeSubcategory={themeSubcategory}
        isForce={isForce}
        isTopic={isTopic}
        isImageLoading={isImageLoading}
        fadeAnim={fadeAnim}
        onPressTopicGuide={onPressTopicGuide}
        onChangeTextTitle={onChangeTextTitle}
        onChangeTextText={onChangeTextText}
        onPressChooseImage={onPressChooseImage}
        onPressCamera={onPressCamera}
        onPressImage={onPressImage}
        onPressDeleteImage={onPressDeleteImage}
        onPressDraft={onPressDraft}
        onPressMyDiary={onPressMyDiary}
        onFocusText={onFocusText}
        onBlurText={onBlurText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: borderLight,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 60,
  },
  headerLabel: {
    marginRight: 4,
  },
  headerValue: {
    marginRight: 8,
  },
});

export default PostDiary;
