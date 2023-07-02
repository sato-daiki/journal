import React, { ReactNode } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/styles/colors';
import { AppText, Icon, AppSwitch } from '@/components';

interface Props {
  type: 'right' | 'check' | 'switch' | 'nothing';
  isBorrderTop?: boolean;
  title: string;
  checkValue?: boolean;
  switchValue?: boolean;
  leftIcon?: ReactNode;
  righComponent?: ReactNode;
  onPress?: () => void;
  onValueChange?: (value: boolean) => void;
}

const OptionItem: React.FC<Props> = ({
  type,
  isBorrderTop = false,
  title,
  checkValue,
  switchValue,
  leftIcon,
  righComponent,
  onPress,
  onValueChange,
}) => {
  const theme = useAppTheme();
  const borderTopWidth = isBorrderTop ? 0.5 : undefined;
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderBottomColor: theme.colors.borderLight,
          borderTopColor: theme.colors.borderLight,
          borderTopWidth,
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.leftContainer}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <AppText size='m'>{title}</AppText>
      </View>
      <View style={styles.rightContainer}>
        {righComponent}
        {type === 'right' ? (
          <Icon
            icon='community'
            size={28}
            color={theme.colors.secondary}
            name='chevron-right'
          />
        ) : type === 'check' && checkValue ? (
          <Icon icon='community' name='check' size={26} />
        ) : type === 'switch' ? (
          <AppSwitch onValueChange={onValueChange} value={switchValue} />
        ) : null}
      </View>
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
    paddingRight: 6,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    width: 22,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default OptionItem;
