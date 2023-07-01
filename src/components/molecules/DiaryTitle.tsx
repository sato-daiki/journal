import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import I18n from '@/utils/I18n';
import { ThemeCategory, ThemeSubcategory } from '@/types';
import { fontSizeM, primaryColor, subTextColor } from '@/styles/Common';
import SmallPill from '../atoms/SmallPill';

interface Props {
  themeCategory?: ThemeCategory | null;
  themeSubcategory?: ThemeSubcategory | null;
  title: string;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingBottom: 8,
  },
  title: {
    color: primaryColor,
    fontWeight: 'bold',
    fontSize: fontSizeM,
    flex: 1,
  },
  smallPill: {
    marginRight: 8,
  },
});

const DiaryTitle = ({ themeCategory, themeSubcategory, title }: Props) => (
  <View style={styles.container}>
    {themeCategory && themeSubcategory && (
      <SmallPill
        containerStyle={styles.smallPill}
        text={I18n.t(`themeCategory.${themeCategory}`)}
        color='#fff'
        backgroundColor={subTextColor}
      />
    )}
    <Text style={styles.title} ellipsizeMode='tail' numberOfLines={1}>
      {title}
    </Text>
  </View>
);

export default React.memo(DiaryTitle);
