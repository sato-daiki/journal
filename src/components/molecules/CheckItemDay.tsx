import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AppText, Checkbox } from '../atoms';
import { useAppTheme } from '@/styles/colors';

interface Props {
  checked: boolean;
  disable?: boolean;
  day: number;
  title: string;
  onPress: (day: number) => void;
}

const CheckItem = ({ title, day, checked, disable, onPress }: Props) => {
  const theme = useAppTheme();
  const onPressItem = useCallback(() => {
    onPress(day);
  }, [day, onPress]);

  return (
    <TouchableOpacity
      onPress={onPressItem}
      style={[
        styles.container,
        { borderBottomColor: theme.colors.borderLight },
        disable ? styles.opacity : undefined,
      ]}
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
    borderBottomWidth: 0.5,
    height: 48,
    paddingLeft: 16,
    paddingRight: 14,
  },
  opacity: {
    opacity: 0.4,
  },
});

export default React.memo(CheckItem);
