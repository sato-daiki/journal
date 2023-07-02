import React from 'react';
import { StyleSheet } from 'react-native';
import { Diary, HumanCorrect } from '@/types';
import HumanWords from './HumanWords';
import { AppText } from '@/components/atoms';
import { fontSizeM } from '@/styles/Common';
import CommonDiaryTitleAndText from '../CommonAi/CommonDiaryTitleAndText';

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
            isTitle
            humanCorrects={titleArray}
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
        textArray && textArray.length > 0 ? (
          <HumanWords
            isTitle={false}
            humanCorrects={textArray}
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

export default HumanDiaryTitleAndText;
