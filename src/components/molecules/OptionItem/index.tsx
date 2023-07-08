import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@/styles/colors';
import { AppSwitch, AppText } from '../../atoms';
import { horizontalScale, moderateScale } from '@/styles/metrics';
import OptionItemContainer from './OptionItemContainer';

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
  return (
    <OptionItemContainer
      isBorrderTop={isBorrderTop}
      backgroundColor={backgroundColor}
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
    </OptionItemContainer>
  );
};

const styles = StyleSheet.create({
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
