import React from 'react';
import { StyleSheet } from 'react-native';
import I18n from '@/utils/I18n';
import { ThemeCategory } from '@/types';
import { SmallPill } from '@/components/atoms';
import { useAppTheme, white } from '@/styles/colors';

interface Props {
  themeCategory: ThemeCategory;
}

const ThemeSmallPill: React.FC<Props> = ({ themeCategory }) => {
  const theme = useAppTheme();
  return (
    <SmallPill
      containerStyle={styles.smallPill}
      text={I18n.t(`themeCategory.${themeCategory}`)}
      color={white}
      backgroundColor={theme.colors.secondary}
    />
  );
};

const styles = StyleSheet.create({
  smallPill: {
    marginRight: 8,
  },
});

export default ThemeSmallPill;
