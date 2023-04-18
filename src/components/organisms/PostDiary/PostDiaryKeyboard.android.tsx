import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  TextInputText,
  Hoverable,
  TextInputTitle,
  TextButtun,
} from '@/components/atoms';

import I18n from '@/utils/I18n';
import { getMaxPostText } from '@/utils/diary';
import { mainColor, offWhite } from '@/styles/Common';
import { PostDiaryKeyboardProps } from './interface';

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
  title,
  text,
  learnLanguage,
  themeCategory,
  themeSubcategory,
  onChangeTextTitle,
  onChangeTextText,
  onPressDraft,
  onFocusText,
  onBlurText,
  onPressThemeGuide,
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
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
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
            maxLength={getMaxPostText()}
            onChangeText={onChangeTextText}
            onFocus={onFocusText}
            onBlur={onBlurText}
          />
        </View>
      </KeyboardAvoidingView>
      <SafeAreaView>
        {isKeyboard ? null : (
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
