import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { getTime } from '@/utils/time';
import { useAppTheme } from '@/styles/colors';
import { AppText } from '@/components/atoms';
import { horizontalScale, moderateScale, verticalScale } from '@/styles/metrics';

type Props = {
  date: Date;
  onPress: () => void;
};

const TimeBox: React.FC<Props> = ({ onPress, date }) => {
  const theme = useAppTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.border, { borderColor: theme.colors.main }]}
    >
      <AppText size='m'>{getTime(date)}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  border: {
    borderRadius: moderateScale(4),
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
    borderWidth: moderateScale(1),
  },
});

export default React.memo(TimeBox);
