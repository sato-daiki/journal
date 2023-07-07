import React from 'react';
import { View, StyleSheet } from 'react-native';
import I18n from '@/utils/I18n';
import { ThemeCategory, ThemeSubcategory } from '@/types';
import { useAppTheme, white } from '@/styles/colors';
import { SmallPill } from '@/components/atoms';
import DiaryTitle from './DiaryTitle';
import { horizontalScale, verticalScale } from '@/styles/metrics';

interface Props {
  isTail: boolean;
  themeCategory?: ThemeCategory | null;
  themeSubcategory?: ThemeSubcategory | null;
  title: string;
}

const DiaryTitleWithPill = ({
  isTail,
  themeCategory,
  themeSubcategory,
  title,
}: Props) => {
  const theme = useAppTheme();
  return (
    <View style={styles.container}>
      {themeCategory && themeSubcategory && (
        <SmallPill
          containerStyle={styles.smallPill}
          text={I18n.t(`themeCategory.${themeCategory}`)}
          color={white}
          backgroundColor={theme.colors.secondary}
        />
      )}
      {isTail ? (
        <DiaryTitle ellipsizeMode={'tail'} numberOfLines={1}>
          {title}
        </DiaryTitle>
      ) : (
        <DiaryTitle>{title}</DiaryTitle>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingBottom: verticalScale(8),
  },
  smallPill: {
    marginRight: horizontalScale(8),
  },
});

export default React.memo(DiaryTitleWithPill);
