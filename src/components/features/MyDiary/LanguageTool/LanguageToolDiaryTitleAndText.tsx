import React from 'react';
import { StyleSheet } from 'react-native';
import { LongCode, Match, ThemeCategory, ThemeSubcategory } from '@/types';
import LanguageToolWords from './LanguageToolWords';
import CommonDiaryTitleAndText from '../CommonAi/CommonDiaryTitleAndText';
import { AppText } from '@/components/atoms';
import { fontSizeM } from '@/styles/Common';

interface Props {
  isPerfect: boolean;
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

const LanguageToolDiaryTitleAndText: React.FC<Props> = ({
  isPerfect,
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
      isPerfect={isPerfect}
      title={title}
      text={text}
      aiName='LanguageTool'
      longCode={longCode}
      themeCategory={themeCategory}
      themeSubcategory={themeSubcategory}
      titleComponent={
        titleMatches && titleMatches.length > 0 ? (
          <LanguageToolWords
            isTitle
            text={title}
            matches={titleMatches}
            activeIndex={titleActiveIndex}
            setActiveIndex={setTitleActiveIndex}
            setOtherIndex={setTextActiveIndex}
          />
        ) : (
          <AppText size='m' bold>
            {title}
          </AppText>
        )
      }
      textComponent={
        textMatches && textMatches.length > 0 ? (
          <LanguageToolWords
            isTitle={false}
            text={text}
            matches={textMatches}
            activeIndex={textActiveIndex}
            setActiveIndex={setTextActiveIndex}
            setOtherIndex={setTitleActiveIndex}
          />
        ) : (
          <AppText size='m' bold style={styles.text}>
            {text}
          </AppText>
        )
      }
      onPressShare={onPressShare}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    lineHeight: fontSizeM * 1.8,
  },
});

export default LanguageToolDiaryTitleAndText;
