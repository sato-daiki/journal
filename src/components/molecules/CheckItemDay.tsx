import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AppText, Checkbox } from '../atoms';
import { borderLight } from '@/styles/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

interface Props {
  checked: boolean;
  disable?: boolean;
  day: number;
  title: string;
  onPress: (day: number) => void;
}

const CheckItem = ({ title, day, checked, disable, onPress }: Props) => {
  const onPressItem = useCallback(() => {
    onPress(day);
  }, [day, onPress]);

  return (
    <TouchableOpacity
      onPress={onPressItem}
      style={[styles.container, disable ? styles.opacity : undefined]}
    >
      <AppText size='m'>{title}</AppText>
      <Checkbox checked={checked} disable={disable} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: moderateScale(0.5),
    height: verticalScale(48),
    paddingLeft: horizontalScale(16),
    paddingRight: horizontalScale(14),
    borderBottomColor: borderLight,
  },
  opacity: {
    opacity: 0.4,
  },
});

export default React.memo(CheckItem);
