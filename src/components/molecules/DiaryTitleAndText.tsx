import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import I18n from '@/utils/I18n';
import { fontSizeM, primaryColor, subTextColor } from '@/styles/Common';
import { Match, ThemeCategory, ThemeSubcategory } from '@/types';
import { SmallPill, Space } from '@/components/atoms';
import Words from './Words';

interface Props {
  title: string;
  text: string;
  themeCategory?: ThemeCategory | null;
  themeSubcategory?: ThemeSubcategory | null;
  titleMatches?: Match[] | [];
  textMatches?: Match[] | [];
  titleActiveIndex?: number | null;
  textActiveIndex?: number | null;
  setTitleActiveIndex?: (activeId: number | null) => void;
  setTextActiveIndex?: (activeId: number | null) => void;
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
  title,
  text,
  themeCategory,
  themeSubcategory,
  titleMatches,
  textMatches,
  titleActiveIndex,
  textActiveIndex,
  setTitleActiveIndex,
  setTextActiveIndex,
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
        {titleMatches && titleMatches.length > 0 ? (
          <Words
            textStyle={styles.title}
            text={title}
            matches={titleMatches}
            activeIndex={titleActiveIndex}
            setActiveIndex={setTitleActiveIndex}
            setOtherIndex={setTextActiveIndex}
          />
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}
      </View>
      <Space size={16} />
      {textMatches && textMatches.length > 0 ? (
        <Words
          text={text}
          matches={textMatches}
          activeIndex={textActiveIndex}
          setActiveIndex={setTextActiveIndex}
          setOtherIndex={setTitleActiveIndex}
        />
      ) : (
        <Text>{text}</Text>
      )}
      <Space size={16} />
    </>
  );
};

export default DiaryTitleAndText;
