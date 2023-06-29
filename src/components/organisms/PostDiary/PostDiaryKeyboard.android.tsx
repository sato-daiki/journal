import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { TextInputText, TextInputTitle } from '@/components/atoms';
import { offWhite } from '@/styles/Common';
import { PostDiaryKeyboardProps } from './interface';
import Footer, { FOOTER_HEIGHT } from './Footer';
import ThumbnailList from './ThumbnailList';
import KeyboardIcons from './KeyboardIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
  textInput: {
    height: 400,
  },
  footer: {
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
  themeCategory,
  themeSubcategory,
  onChangeTextTitle,
  onChangeTextText,
  onPressChooseImage,
  onPressCamera,
  onPressDeleteImage,
  onPressImage,
  onPressDraft,
  onFocusText,
  onBlurText,
  onPressTopicGuide,
  onPressMyDiary,
}) => {
  const [isKeyboard, setIsKeyboard] = useState(false);
  const onKeyboardDidShow = (): void => {
    setIsKeyboard(true);
  };

  const onKeyboardDidHide = (): void => {
    setIsKeyboard(false);
  };

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidShow,
    );
    const keyboardDidHide = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardDidHide,
    );

    // cleanup function
    return (): void => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={-180}
        style={styles.container}
        behavior='height'
      >
        <View style={styles.inner}>
          <TextInputTitle
            editable={!themeCategory || !themeSubcategory}
            value={title}
            onFocus={onFocusText}
            onChangeText={onChangeTextTitle}
          />
          <TextInputText
            style={styles.textInput}
            value={text}
            onChangeText={onChangeTextText}
            onFocus={onFocusText}
            onBlur={onBlurText}
          />
          {(isImageLoading || (images && images.length > 0)) && (
            <ThumbnailList
              isImageLoading={isImageLoading}
              style={[{ marginBottom: isKeyboard ? 0 : FOOTER_HEIGHT }]}
              images={images}
              onPressImage={onPressImage}
              onPressDeleteImage={onPressDeleteImage}
            />
          )}
        </View>
      </KeyboardAvoidingView>
      <SafeAreaView>
        {isKeyboard ? null : (
          <Footer
            isTopic={isTopic}
            onPressTopicGuide={onPressTopicGuide}
            onPressDraft={onPressDraft}
            onPressMyDiary={onPressMyDiary}
          />
        )}
      </SafeAreaView>
      {isKeyboard ? (
        <KeyboardIcons
          images={images}
          onPressChooseImage={onPressChooseImage}
          onPressCamera={onPressCamera}
        />
      ) : null}
    </View>
  );
};

export default PostDiaryKeyboard;
