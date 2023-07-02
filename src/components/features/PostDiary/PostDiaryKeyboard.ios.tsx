import React from 'react';
import { SafeAreaView, Animated } from 'react-native';
import { KeyboardSpacer } from '@/components/atoms';
import { PostDiaryKeyboardProps } from './interface';
import Footer, { FOOTER_HEIGHT } from './Footer';
import ThumbnailList from './ThumbnailList';
import KeyboardIcons from './KeyboardIcons';
import TextInputTitle from '../MyDiary/TextInputTitle';
import TextInputText from '../MyDiary/TextInputText';

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
          <KeyboardIcons
            images={images}
            onPressChooseImage={onPressChooseImage}
            onPressCamera={onPressCamera}
          />
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
