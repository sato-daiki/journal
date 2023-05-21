import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { fontSizeM, primaryColor } from '@/styles/Common';
import { LongCode, Match, ThemeCategory, ThemeSubcategory } from '@/types';
import LanguageToolWords from './LanguageToolWords';
import CommonDiaryTitleAndText from './CommonDiaryTitleAndText';

interface Props {
  title: string;
  text: string;
  longCode: LongCode;
  themeCategory?: ThemeCategory | null;
  themeSubcategory?: ThemeSubcategory | null;
  titleMatches?: Match[] | [];
  textMatches?: Match[] | [];
  titleActiveIndex?: number | null;
  textActiveIndex?: number | null;
  setTitleActiveIndex?: (activeId: number | null) => void;
  setTextActiveIndex?: (activeId: number | null) => void;
  onPressShare: () => void;
}

export const styles = StyleSheet.create({
  title: {
    color: primaryColor,
    fontWeight: 'bold',
    fontSize: fontSizeM,
    flex: 1,
  },
  text: {
    lineHeight: fontSizeM * 1.8,
    fontSize: fontSizeM,
    color: primaryColor,
  },
});

const LanguageToolDiaryTitleAndText: React.FC<Props> = ({
  title,
  text,
  longCode,
  themeCategory,
  themeSubcategory,
  titleMatches,
  textMatches,
  titleActiveIndex,
  textActiveIndex,
  setTitleActiveIndex,
  setTextActiveIndex,
  onPressShare,
}) => {
  return (
    <CommonDiaryTitleAndText
      title={title}
      text={text}
      aiName='LanguageTool'
      longCode={longCode}
      themeCategory={themeCategory}
      themeSubcategory={themeSubcategory}
      titleComponent={
        titleMatches && titleMatches.length > 0 ? (
          <LanguageToolWords
            textStyle={styles.title}
            text={title}
            matches={titleMatches}
            activeIndex={titleActiveIndex}
            setActiveIndex={setTitleActiveIndex}
            setOtherIndex={setTextActiveIndex}
          />
        ) : (
          <Text style={styles.title}>{title}</Text>
        )
      }
      textComponent={
        textMatches && textMatches.length > 0 ? (
          <LanguageToolWords
            textStyle={styles.text}
            text={text}
            matches={textMatches}
            activeIndex={textActiveIndex}
            setActiveIndex={setTextActiveIndex}
            setOtherIndex={setTitleActiveIndex}
          />
        ) : (
          <Text style={styles.text}>{text}</Text>
        )
      }
      onPressShare={onPressShare}
    />
  );
};

export default LanguageToolDiaryTitleAndText;
