import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Keyboard,
  Animated,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  KeyboardSpacer,
  TextInputText,
  Hoverable,
  TextInputTitle,
  TextButtun,
} from '@/components/atoms';

import { getMaxPostText } from '@/utils/diary';
import { offWhite, mainColor } from '@/styles/Common';
import I18n from '@/utils/I18n';
import { PostDiaryKeyboardProps } from './interface';

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
  title,
  text,
  learnLanguage,
  isForce,
  themeCategory,
  themeSubcategory,
  fadeAnim,
  onPressThemeGuide,
  onChangeTextTitle,
  onChangeTextText,
  onPressDraft,
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
        maxLength={getMaxPostText(learnLanguage)}
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
        <View style={styles.footer}>
          {!themeCategory || !themeSubcategory ? null : (
            <TextButtun
              isBorrderTop
              title={I18n.t('postDiaryComponent.hint')}
              onPress={onPressThemeGuide}
            />
          )}
          <TextButtun
            isBorrderTop
            isBorrderBottom
            title={I18n.t('postDiaryComponent.draft')}
            onPress={onPressDraft}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default PostDiaryKeyboard;
