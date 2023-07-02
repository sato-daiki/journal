import React from 'react';
import { View, StyleSheet } from 'react-native';
import I18n from '@/utils/I18n';
import { ThemeCategory, ThemeSubcategory } from '@/types';
import { useAppTheme } from '@/styles/colors';
import { AppText, SmallPill } from '@/components/atoms';

interface Props {
  themeCategory?: ThemeCategory | null;
  themeSubcategory?: ThemeSubcategory | null;
  title: string;
}

const DiaryTitle = ({ themeCategory, themeSubcategory, title }: Props) => {
  const theme = useAppTheme();
  return (
    <View style={styles.container}>
      {themeCategory && themeSubcategory && (
        <SmallPill
          containerStyle={styles.smallPill}
          text={I18n.t(`themeCategory.${themeCategory}`)}
          color='#fff'
          backgroundColor={theme.colors.secondary}
        />
      )}
      <AppText
        size='m'
        bold
        style={styles.title}
        ellipsizeMode='tail'
        numberOfLines={1}
      >
        {title}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingBottom: 8,
  },
  title: {
    flex: 1,
  },
  smallPill: {
    marginRight: 8,
  },
});

export default React.memo(DiaryTitle);
