import React, { ReactNode } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { borderLight, useAppTheme } from '@/styles/colors';
import { AppSwitch, AppText } from '../atoms';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

interface Props {
  type: 'right' | 'check' | 'switch' | 'nothing';
  isBorrderTop?: boolean;
  backgroundColor?: string;
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
  backgroundColor,
  title,
  checkValue,
  switchValue,
  leftIcon,
  righComponent,
  onPress,
  onValueChange,
}) => {
  const theme = useAppTheme();
  const borderTopWidth = isBorrderTop ? moderateScale(0.5) : undefined;
  return (
    <TouchableOpacity
      disabled={!onPress}
      style={[
        styles.container,
        {
          borderTopWidth,
          backgroundColor: backgroundColor || theme.colors.option,
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
          <MaterialCommunityIcons
            size={moderateScale(28)}
            color={theme.colors.secondary}
            name='chevron-right'
          />
        ) : type === 'check' && checkValue ? (
          <MaterialCommunityIcons
            size={moderateScale(26)}
            color={theme.colors.primary}
            name='check'
          />
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
    borderBottomWidth: moderateScale(0.5),
    height: verticalScale(48),
    paddingLeft: horizontalScale(16),
    paddingRight: horizontalScale(6),
    borderBottomColor: borderLight,
    borderTopColor: borderLight,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    width: horizontalScale(22),
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default OptionItem;
