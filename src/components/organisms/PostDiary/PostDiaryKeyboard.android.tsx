import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {
  TextInputText,
  TextInputTitle,
  HoverableIcon,
} from '@/components/atoms';
import { mainColor, offWhite } from '@/styles/Common';
import { PostDiaryKeyboardProps } from './interface';
import Footer from './Footer';

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
  keybordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 8,
    paddingLeft: 16,
    paddingVertical: 4,
  },
  footer: {
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: offWhite,
  },
});

const PostDiaryKeyboard: React.FC<PostDiaryKeyboardProps> = ({
  isTopic,
  isImageLoading,
  title,
  text,
  images,
  themeCategory,
  themeSubcategory,
  onChangeTextTitle,
  onChangeTextText,
  onPressChooseImage,
  onPressCamera,
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
        <View style={styles.keybordRow}>
          <HoverableIcon
            icon='community'
            onPress={onPressChooseImage}
            size={24}
            color={mainColor}
            name='file-image-outline'
          />
          <HoverableIcon
            icon='community'
            onPress={Keyboard.dismiss}
            size={24}
            color={mainColor}
            name='keyboard-close'
          />
        </View>
      ) : null}
    </View>
  );
};

export default PostDiaryKeyboard;
