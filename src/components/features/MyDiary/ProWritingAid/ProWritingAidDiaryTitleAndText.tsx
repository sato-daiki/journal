import React from 'react';
import { ThemeCategory, ThemeSubcategory, Tag, LongCode } from '@/types';
import ProWritingAidWords from './ProWritingAidWords';
import CommonDiaryTitleAndText from '../CommonAi/CommonDiaryTitleAndText';
import DiaryText from '../DiaryText';
import DiaryTitle from '../DiaryTitle';

interface Props {
  isPerfect: boolean;
  title: string;
  text: string;
  longCode: LongCode;
  themeCategory?: ThemeCategory | null;
  themeSubcategory?: ThemeSubcategory | null;
  titleTags?: Tag[] | [];
  textTags?: Tag[] | [];
  titleActiveIndex?: number | null;
  textActiveIndex?: number | null;
  setTitleActiveIndex?: (activeId: number | null) => void;
  setTextActiveIndex?: (activeId: number | null) => void;
  onPressShare: () => void;
}

const ProWritingAidDiaryTitleAndText: React.FC<Props> = ({
  isPerfect,
  title,
  text,
  longCode,
  themeCategory,
  themeSubcategory,
  titleTags,
  textTags,
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
      aiName='ProWritingAid'
      longCode={longCode}
      themeCategory={themeCategory}
      themeSubcategory={themeSubcategory}
      titleComponent={
        titleTags && titleTags.length > 0 ? (
          <ProWritingAidWords
            isTitle
            text={title}
            tags={titleTags}
            activeIndex={titleActiveIndex}
            setActiveIndex={setTitleActiveIndex}
            setOtherIndex={setTextActiveIndex}
          />
        ) : (
          <DiaryTitle>{title}</DiaryTitle>
        )
      }
      textComponent={
        textTags && textTags.length > 0 ? (
          <ProWritingAidWords
            isTitle={false}
            text={text}
            tags={textTags}
            activeIndex={textActiveIndex}
            setActiveIndex={setTextActiveIndex}
            setOtherIndex={setTitleActiveIndex}
          />
        ) : (
          <DiaryText>{text}</DiaryText>
        )
      }
      onPressShare={onPressShare}
    />
  );
};

export default ProWritingAidDiaryTitleAndText;
