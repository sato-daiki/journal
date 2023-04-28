import React from 'react';
import { StyleSheet, View } from 'react-native';
import I18n from '@/utils/I18n';
import { fontSizeM, primaryColor, subTextColor } from '@/styles/Common';
import {
  CheckInfo,
  Language,
  ThemeCategory,
  ThemeSubcategory,
  Word,
} from '@/types';
import RichText from '@/components/organisms/RichText';
import { SmallPill, Space } from '@/components/atoms';
import Words from './Words';

interface Props {
  textLanguage: Language;
  title: string;
  text: string;
  themeCategory?: ThemeCategory | null;
  themeSubcategory?: ThemeSubcategory | null;
  words?: Word[];
  activeIndex?: number | null;
  setActiveIndex?: (activeIndex: number | null) => void;
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingBottom: 8,
  },
  title: {
    color: primaryColor,
    fontWeight: 'bold',
    fontSize: fontSizeM,
  },
  text: {
    lineHeight: fontSizeM * 1.3,
    fontSize: fontSizeM,
    color: primaryColor,
  },
  smallPill: {
    marginRight: 8,
  },
});

const DiaryTitleAndText: React.FC<Props> = ({
  textLanguage,
  title,
  text,
  themeCategory,
  themeSubcategory,
  words,
  activeIndex,
  setActiveIndex,
}) => {
  return (
    <>
      <View style={styles.titleContainer}>
        {themeCategory && themeSubcategory && (
          <SmallPill
            containerStyle={styles.smallPill}
            text={I18n.t('myDiaryList.theme')}
            color='#fff'
            backgroundColor={subTextColor}
          />
        )}
        <RichText
          style={styles.title}
          text={title}
          textLanguage={textLanguage}
        />
      </View>
      <Space size={16} />
      {words && (
        <Words
          text={text}
          words={words}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      )}
      <Space size={16} />
    </>
  );
};

export default DiaryTitleAndText;
