import React from 'react';
import { StyleSheet, SafeAreaView, Keyboard, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  KeyboardSpacer,
  TextInputText,
  Hoverable,
  TextInputTitle,
} from '@/components/atoms';

import { offWhite, mainColor } from '@/styles/Common';
import { PostDiaryKeyboardProps } from './interface';
import Footer from './Footer';

const styles = StyleSheet.create({
  icon: {
    alignItems: 'flex-end',
    paddingRight: 8,
    paddingTop: 4,
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
  isTopic,
  title,
  text,
  isForce,
  themeCategory,
  themeSubcategory,
  fadeAnim,
  onPressTopicGuide,
  onChangeTextTitle,
  onChangeTextText,
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
      />
      <TextInputText
        value={text}
        onFocus={onFocusText}
        onChangeText={onChangeTextText}
        onBlur={onBlurText}
      />
      {isForce ? (
        <Animated.View
          style={{
            opacity: fadeAnim,
          }}
        >
          <Hoverable style={styles.icon} onPress={Keyboard.dismiss}>
            <MaterialCommunityIcons
              size={24}
              color={mainColor}
              name='keyboard-close'
            />
          </Hoverable>
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
