import React, { useMemo } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Keyboard,
  Animated,
  View,
} from 'react-native';

import {
  KeyboardSpacer,
  TextInputText,
  TextInputTitle,
  HoverableIcon,
} from '@/components/atoms';

import { offWhite, mainColor } from '@/styles/Common';
import { PostDiaryKeyboardProps } from './interface';
import Footer, { FOOTER_HEIGHT } from './Footer';
import ThumbnailList from './ThumbnailList';
import { MAX_IMAGE_NUM } from '@/constants/common';

const styles = StyleSheet.create({
  keybordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 8,
    paddingLeft: 16,
    paddingVertical: 4,
  },
  keybordLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingRight: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 80,
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: offWhite,
  },
});

const PostDiaryKeyboard: React.FC<PostDiaryKeyboardProps> = ({
  isImageLoading,
  isTopic,
  title,
  text,
  images,
  isForce,
  themeCategory,
  themeSubcategory,
  fadeAnim,
  onPressTopicGuide,
  onChangeTextTitle,
  onChangeTextText,
  onPressChooseImage,
  onPressCamera,
  onPressImage,
  onPressDeleteImage,
  onPressDraft,
  onPressMyDiary,
  onFocusText,
  onBlurText,
}) => {
  const isAddImage = useMemo(() => {
    if (!images) return true;
    if (images.length < MAX_IMAGE_NUM) return true;
    return false;
  }, [images]);

  return (
    <>
      <TextInputTitle
        editable={!themeCategory || !themeSubcategory}
        value={title}
        onFocus={onFocusText}
        onChangeText={onChangeTextTitle}
        onBlur={onBlurText}
      />
      <TextInputText
        value={text}
        onFocus={onFocusText}
        onChangeText={onChangeTextText}
        onBlur={onBlurText}
      />

      {(isImageLoading || (images && images.length > 0)) && (
        <ThumbnailList
          isImageLoading={isImageLoading}
          style={[{ marginBottom: isForce ? 0 : FOOTER_HEIGHT }]}
          images={images}
          onPressImage={onPressImage}
          onPressDeleteImage={onPressDeleteImage}
        />
      )}
      {isForce ? (
        <Animated.View
          style={{
            opacity: fadeAnim,
          }}
        >
          <View style={styles.keybordRow}>
            <View style={styles.keybordLeftRow}>
              <HoverableIcon
                style={[styles.icon, !isAddImage && { opacity: 0.3 }]}
                icon='community'
                name='file-image-outline'
                size={24}
                color={mainColor}
                onPress={isAddImage ? onPressChooseImage : undefined}
              />
              <HoverableIcon
                style={!isAddImage && { opacity: 0.3 }}
                icon='community'
                name='camera-outline'
                size={24}
                color={mainColor}
                onPress={isAddImage ? onPressCamera : undefined}
              />
            </View>
            <HoverableIcon
              icon='community'
              name='keyboard-close'
              size={24}
              color={mainColor}
              onPress={Keyboard.dismiss}
            />
          </View>
        </Animated.View>
      ) : null}
      <KeyboardSpacer />
      {/* 画面下部がiOSX以上の時隠れてしまうのを対応 */}
      <SafeAreaView>
        <Footer
          isTopic={isTopic}
          onPressTopicGuide={onPressTopicGuide}
          onPressDraft={onPressDraft}
          onPressMyDiary={onPressMyDiary}
        />
      </SafeAreaView>
    </>
  );
};

export default PostDiaryKeyboard;
