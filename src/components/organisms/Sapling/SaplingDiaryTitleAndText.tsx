import React from 'react';
import { View, Text } from 'react-native';
import { ThemeCategory, ThemeSubcategory, Edit } from '@/types';
import { Space } from '@/components/atoms';
import SaplingWords from './SaplingWords';
import { styles } from '../LanguageTool/LanguageToolDiaryTitleAndText';
import CommonSmallPill from '../../molecules/CommonSmallPill';

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
    <>
      <View style={styles.titleContainer}>
        {themeCategory && themeSubcategory && (
          <CommonSmallPill themeCategory={themeCategory} />
        )}
        {titleEdits && titleEdits.length > 0 ? (
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
        )}
      </View>
      <Space size={16} />
      {textEdits && textEdits.length > 0 ? (
        <SaplingWords
          text={text}
          edits={textEdits}
          activeIndex={textActiveIndex}
          setActiveIndex={setTextActiveIndex}
          setOtherIndex={setTitleActiveIndex}
        />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
      <Space size={16} />
    </>
  );
};

export default SaplingDiaryTitleAndText;
