import React from 'react';
import { Text } from 'react-native';
import { Diary, HumanCorrect } from '@/types';
import { styles } from '../LanguageTool/LanguageToolDiaryTitleAndText';
import CommonDiaryTitleAndText from '../LanguageTool/CommonDiaryTitleAndText';
import HumanWords from './HumanWords';

interface Props {
  isPerfect: boolean;
  diary: Diary;
  title: string;
  text: string;
  titleArray: HumanCorrect[] | [] | undefined | null;
  textArray: HumanCorrect[] | [] | undefined | null;
  titleActiveIndex?: number | null;
  textActiveIndex?: number | null;
  setTitleActiveIndex?: (activeId: number | null) => void;
  setTextActiveIndex?: (activeId: number | null) => void;
  onPressShare: () => void;
}

const HumanDiaryTitleAndText: React.FC<Props> = ({
  isPerfect,
  diary,
  title,
  text,
  titleArray,
  textArray,
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
      longCode={diary.longCode}
      themeCategory={diary.themeCategory}
      themeSubcategory={diary.themeSubcategory}
      titleComponent={
        titleArray && titleArray.length > 0 ? (
          <HumanWords
            textStyle={styles.title}
            humanCorrects={titleArray}
            activeIndex={titleActiveIndex}
            setActiveIndex={setTitleActiveIndex}
            setOtherIndex={setTextActiveIndex}
          />
        ) : (
          <Text style={styles.title}>{title}</Text>
        )
      }
      textComponent={
        textArray && textArray.length > 0 ? (
          <HumanWords
            textStyle={styles.text}
            humanCorrects={textArray}
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

export default HumanDiaryTitleAndText;
