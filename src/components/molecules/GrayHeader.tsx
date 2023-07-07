import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';
import { useAppTheme } from '@/styles/colors';
import { horizontalScale, verticalScale } from '@/styles/metrics';

interface Props {
  icon?: ReactNode;
  title: string;
}

const GrayHeader: React.FC<Props> = ({ title, icon }: Props) => {
  const theme = useAppTheme();
  return (
    <View style={[styles.row, { backgroundColor: theme.colors.backgroundOff }]}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <AppText bold size='m'>
        {title}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginRight: horizontalScale(8),
  },
});

export default React.memo(GrayHeader);
