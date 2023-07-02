import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemeCategory, ThemeSubcategory, Edit, LongCode } from '@/types';
import SaplingWords from './SaplingWords';
import { AppText } from '@/components/atoms';
import { fontSizeM } from '@/styles/Common';
import CommonDiaryTitleAndText from '../CommonAi/CommonDiaryTitleAndText';

interface Props {
  isPerfect: boolean;
  title: string;
  text: string;
  longCode: LongCode;
  themeCategory?: ThemeCategory | null;
  themeSubcategory?: ThemeSubcategory | null;
  titleEdits?: Edit[] | [];
  textEdits?: Edit[] | [];
  titleActiveIndex?: number | null;
  textActiveIndex?: number | null;
  setTitleActiveIndex?: (activeId: number | null) => void;
  setTextActiveIndex?: (activeId: number | null) => void;
  onPressShare: () => void;
}

const SaplingDiaryTitleAndText: React.FC<Props> = ({
  isPerfect,
  title,
  text,
  longCode,
  themeCategory,
  themeSubcategory,
  titleEdits,
  textEdits,
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
      aiName='Sapling'
      longCode={longCode}
      themeCategory={themeCategory}
      themeSubcategory={themeSubcategory}
      titleComponent={
        titleEdits && titleEdits.length > 0 ? (
          <SaplingWords
            isTitle
            text={title}
            edits={titleEdits}
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
        textEdits && textEdits.length > 0 ? (
          <SaplingWords
            isTitle={false}
            text={text}
            edits={textEdits}
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

export default SaplingDiaryTitleAndText;
