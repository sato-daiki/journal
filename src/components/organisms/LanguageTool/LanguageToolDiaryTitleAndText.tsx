import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { fontSizeM, primaryColor } from '@/styles/Common';
import { Match, ThemeCategory, ThemeSubcategory } from '@/types';
import LanguageToolWords from './LanguageToolWords';
import DiaryTitleAndText from './DiaryTitleAndText';

interface Props {
  title: string;
  text: string;
  themeCategory?: ThemeCategory | null;
  themeSubcategory?: ThemeSubcategory | null;
  titleMatches?: Match[] | [];
  textMatches?: Match[] | [];
  titleActiveIndex?: number | null;
  textActiveIndex?: number | null;
  setTitleActiveIndex?: (activeId: number | null) => void;
  setTextActiveIndex?: (activeId: number | null) => void;
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
  themeCategory,
  themeSubcategory,
  titleMatches,
  textMatches,
  titleActiveIndex,
  textActiveIndex,
  setTitleActiveIndex,
  setTextActiveIndex,
}) => {
  return (
    <DiaryTitleAndText
      title={title}
      text={text}
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
    />
  );
};

export default LanguageToolDiaryTitleAndText;
