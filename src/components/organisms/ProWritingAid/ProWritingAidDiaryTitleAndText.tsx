import React from 'react';
import { Text } from 'react-native';
import { ThemeCategory, ThemeSubcategory, Tag, LongCode } from '@/types';
import ProWritingAidWords from './ProWritingAidWords';
import { styles } from '../LanguageTool/LanguageToolDiaryTitleAndText';
import CommonDiaryTitleAndText from '../LanguageTool/CommonDiaryTitleAndText';

interface Props {
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
      title={title}
      text={text}
      aiName='ProWritingAid'
      longCode={longCode}
      themeCategory={themeCategory}
      themeSubcategory={themeSubcategory}
      titleComponent={
        titleTags && titleTags.length > 0 ? (
          <ProWritingAidWords
            textStyle={styles.title}
            text={title}
            tags={titleTags}
            activeIndex={titleActiveIndex}
            setActiveIndex={setTitleActiveIndex}
            setOtherIndex={setTextActiveIndex}
          />
        ) : (
          <Text style={styles.title}>{title}</Text>
        )
      }
      textComponent={
        textTags && textTags.length > 0 ? (
          <ProWritingAidWords
            text={text}
            tags={textTags}
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

export default ProWritingAidDiaryTitleAndText;
