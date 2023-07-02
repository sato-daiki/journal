import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AppText, Checkbox } from '../atoms';
import { useAppTheme } from '@/styles/colors';

interface Props {
  checked: boolean;
  disable?: boolean;
  title: string;
  onPress: () => void;
}

const CheckItem = ({ title, checked, disable, onPress }: Props) => {
  const theme = useAppTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { borderBottomColor: theme.colors.borderLight },
        disable ? styles.opacity : undefined,
      ]}
    >
      <AppText size='m' style={styles.title}>
        {title}
      </AppText>
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
  title: {
    flex: 1,
  },
  opacity: {
    opacity: 0.4,
  },
});

export default React.memo(CheckItem);
