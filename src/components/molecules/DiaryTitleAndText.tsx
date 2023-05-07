import React from 'react';
import { View, Text } from 'react-native';
import { ThemeCategory, ThemeSubcategory } from '@/types';
import { Space } from '@/components/atoms';
import CommonSmallPill from './CommonSmallPill';
import { styles } from '../organisms/LanguageTool/LanguageToolDiaryTitleAndText';

interface Props {
  title: string;
  text: string;
  themeCategory?: ThemeCategory | null;
  themeSubcategory?: ThemeSubcategory | null;
}

const DiaryTitleAndText: React.FC<Props> = ({
  title,
  text,
  themeCategory,
  themeSubcategory,
}) => {
  return (
    <>
      <View style={styles.titleContainer}>
        {themeCategory && themeSubcategory && (
          <CommonSmallPill themeCategory={themeCategory} />
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      <Space size={16} />
      <Text style={styles.text}>{text}</Text>
      <Space size={16} />
    </>
  );
};

export default DiaryTitleAndText;
