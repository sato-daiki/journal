import React, { ReactNode } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { borderLight, useAppTheme } from '@/styles/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

interface Props {
  style?: StyleProp<ViewStyle>;
  isBorrderTop?: boolean;
  backgroundColor?: string;
  onPress?: () => void;
  children: ReactNode;
}

const OptionItemContainer: React.FC<Props> = ({
  style,
  isBorrderTop,
  backgroundColor,
  onPress,
  children,
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
        style,
      ]}
      onPress={onPress}
    >
      {children}
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
});

export default OptionItemContainer;
