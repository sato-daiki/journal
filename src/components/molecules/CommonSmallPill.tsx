import React from 'react';
import { StyleSheet } from 'react-native';
import I18n from '@/utils/I18n';
import { subTextColor } from '@/styles/Common';
import { ThemeCategory } from '@/types';
import { SmallPill } from '@/components/atoms';

interface Props {
  themeCategory: ThemeCategory;
}

const styles = StyleSheet.create({
  smallPill: {
    marginRight: 8,
  },
});

const CommonSmallPill: React.FC<Props> = ({ themeCategory }) => {
  return (
    <SmallPill
      containerStyle={styles.smallPill}
      text={I18n.t(`themeCategory.${themeCategory}`)}
      color='#fff'
      backgroundColor={subTextColor}
    />
  );
};

export default CommonSmallPill;
