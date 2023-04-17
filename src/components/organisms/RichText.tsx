import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, StyleProp, TextStyle } from 'react-native';
import { fontSizeM, primaryColor } from '../../styles/Common';
import googleTranslate from '../../utils/googleTranslate';
import { Language } from '../../types';
import TextMenu from '../template/TextMenu';

interface Props {
  style?: StyleProp<TextStyle>;
  text: string | null;
  textLanguage: Language;
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.3,
  },
});

const RichText = ({ style, text, textLanguage }: Props) => {
  const [displayText, setDisplayText] = useState(text);
  const [isTranslated, setIsTranslated] = useState(false);

  const onPressTranslate = useCallback(async (): Promise<void> => {
    if (isTranslated) {
      setDisplayText(text);
      setIsTranslated(false);
    } else {
      if (!text) return;
      const mentionRemovedText = text.replace(/@\w+\s/g, '');
      // if (nativeLanguage) {
      //   const targetLanguage =
      //     nativeLanguage === textLanguage ? textLanguage : nativeLanguage;
      //   const translatedText = await googleTranslate(
      //     mentionRemovedText,
      //     targetLanguage,
      //   );
      //   if (translatedText && translatedText.length > 0) {
      //     setDisplayText(translatedText);
      //     setIsTranslated(true);
      //   }
      // }
    }
  }, [isTranslated, text]);

  return (
    <TextMenu
      displayText={displayText || ''}
      textLanguage={textLanguage}
      onPressTranslate={onPressTranslate}
    >
      <Text style={[styles.text, style]}>{displayText}</Text>
    </TextMenu>
  );
};

export default RichText;
