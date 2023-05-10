import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInputText, Hoverable, TextInputTitle } from '@/components/atoms';
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
  icon: {
    alignItems: 'flex-end',
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
  },
  footer: {
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: offWhite,
  },
});

const PostDiaryKeyboard: React.FC<PostDiaryKeyboardProps> = ({
  isTopic,
  title,
  text,
  themeCategory,
  themeSubcategory,
  onChangeTextTitle,
  onChangeTextText,
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
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);

    // cleanup function
    return (): void => {
      // @ts-ignore
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      // @ts-ignore
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
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
        <Hoverable style={styles.icon} onPress={Keyboard.dismiss}>
          <MaterialCommunityIcons
            size={24}
            color={mainColor}
            name='keyboard-close'
          />
        </Hoverable>
      ) : null}
    </View>
  );
};

export default PostDiaryKeyboard;
