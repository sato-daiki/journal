import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import I18n from '@/utils/I18n';
import { fontSizeM, primaryColor, subTextColor } from '@/styles/Common';
import { ThemeCategory, ThemeSubcategory } from '@/types';
import { SmallPill, Space } from '@/components/atoms';

interface Props {
  title: string;
  text: string;
  themeCategory?: ThemeCategory | null;
  themeSubcategory?: ThemeSubcategory | null;
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
    lineHeight: fontSizeM * 1.8,
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
}) => {
  return (
    <>
      <View style={styles.titleContainer}>
        {themeCategory && themeSubcategory && (
          <SmallPill
            containerStyle={styles.smallPill}
            text={I18n.t(`themeCategory.${themeCategory}`)}
            color='#fff'
            backgroundColor={subTextColor}
          />
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
