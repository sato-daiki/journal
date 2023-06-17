import React from 'react';
import { Text } from 'react-native';
import { ThemeCategory, ThemeSubcategory, Edit, LongCode } from '@/types';
import SaplingWords from './SaplingWords';
import { styles } from '../LanguageTool/LanguageToolDiaryTitleAndText';
import CommonDiaryTitleAndText from '../LanguageTool/CommonDiaryTitleAndText';

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
            textStyle={styles.title}
            text={title}
            edits={titleEdits}
            activeIndex={titleActiveIndex}
            setActiveIndex={setTitleActiveIndex}
            setOtherIndex={setTextActiveIndex}
          />
        ) : (
          <Text style={styles.title}>{title}</Text>
        )
      }
      textComponent={
        textEdits && textEdits.length > 0 ? (
          <SaplingWords
            text={text}
            edits={textEdits}
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

export default SaplingDiaryTitleAndText;
