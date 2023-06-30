import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeCategory, ThemeSubcategory } from '@/types';
import { Space } from '@/components/atoms';
import CommonSmallPill from './CommonSmallPill';
import { styles as commonStyle } from '../organisms/LanguageTool/LanguageToolDiaryTitleAndText';

interface Props {
  title: string;
  text: string;
  themeCategory?: ThemeCategory | null;
  themeSubcategory?: ThemeSubcategory | null;
}

export const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingTop: 8,
    paddingBottom: 8,
  },
});

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
        <Text style={commonStyle.title}>{title}</Text>
      </View>
      <Space size={16} />
      <Text style={commonStyle.text}>{text}</Text>
      <Space size={16} />
    </>
  );
};

export default DiaryTitleAndText;
