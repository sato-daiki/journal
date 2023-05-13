import React from 'react';
import { Text } from 'react-native';
import { ThemeCategory, ThemeSubcategory, Edit } from '@/types';
import SaplingWords from './SaplingWords';
import { styles } from '../LanguageTool/LanguageToolDiaryTitleAndText';
import DiaryTitleAndText from '../LanguageTool/DiaryTitleAndText';

interface Props {
  title: string;
  text: string;
  themeCategory?: ThemeCategory | null;
  themeSubcategory?: ThemeSubcategory | null;
  titleEdits?: Edit[] | [];
  textEdits?: Edit[] | [];
  titleActiveIndex?: number | null;
  textActiveIndex?: number | null;
  setTitleActiveIndex?: (activeId: number | null) => void;
  setTextActiveIndex?: (activeId: number | null) => void;
}

const SaplingDiaryTitleAndText: React.FC<Props> = ({
  title,
  text,
  themeCategory,
  themeSubcategory,
  titleEdits,
  textEdits,
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
    />
  );
};

export default SaplingDiaryTitleAndText;
