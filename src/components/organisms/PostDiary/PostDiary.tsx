import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Animated,
  Easing,
} from 'react-native';
import {
  primaryColor,
  borderLightColor,
  offWhite,
  fontSizeSS,
  softRed,
} from '@/styles/Common';
import I18n from '@/utils/I18n';

import { LoadingModal } from '@/components/atoms';
import ModalDiaryCancel from '@/components/organisms/ModalDiaryCancel';
// @ts-ignore
import PostDiaryKeyboard from './PostDiaryKeyboard';
import { PostDiaryProps } from './interface';
import ModalConfirm from '../ModalConfirm';
import LanguagePicker from '../LanguagePicker';
import { MAX_TEXT, MAX_TITLE, getIsTopic } from '@/utils/diary';
import { TopicCategory, TopicSubcategory } from '@/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: offWhite,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: offWhite,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
    width: 52,
  },
  headerLabel: {
    color: primaryColor,
    fontSize: fontSizeSS,
    marginRight: 4,
  },
  headerValue: {
    color: primaryColor,
    fontSize: fontSizeSS,
    marginRight: 8,
  },
});

const PostDiary: React.FC<PostDiaryProps> = ({
  navigation,
  isLoading,
  isModalCancel,
  isModalError,
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
  isImageLoading,
  onPressChooseImage,
  onPressCamera,
  onPressImage,
  onPressDeleteImage,
  onPressDraft,
  onPressMyDiary,
  onPressNotSave,
  onPressCloseError,
  onPressItem,
}) => {
  const [isForce, setIsForce] = useState(false);
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));
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

  return (
    <SafeAreaView style={styles.container}>
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
      <View style={styles.header}>
        <View style={styles.left}>
          <View style={styles.title}>
            <Text style={styles.headerLabel}>
              {I18n.t('postDiaryComponent.titleLength')}
            </Text>
            <Text
              style={[
                styles.headerValue,
                {
                  color:
                    !themeCategory &&
                    !themeSubcategory &&
                    title.length > MAX_TITLE
                      ? softRed
                      : primaryColor,
                },
              ]}
            >
              {title.length}
            </Text>
          </View>
          <Text style={styles.headerLabel}>
            {I18n.t('postDiaryComponent.textLength')}
          </Text>
          <Text
            style={[
              styles.headerValue,
              { color: text.length > MAX_TEXT ? softRed : primaryColor },
            ]}
          >
            {text.length}
          </Text>
        </View>
        {(!themeCategory || !themeSubcategory) &&
          !!selectedItem &&
          !!onPressItem && (
            <View style={styles.right}>
              <LanguagePicker
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
    </SafeAreaView>
  );
};

export default PostDiary;
