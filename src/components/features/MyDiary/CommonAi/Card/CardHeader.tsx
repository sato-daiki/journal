import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@/styles/colors';
import { Icon } from '@/components';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

export interface Props {
  activeLeft: boolean;
  activeRight: boolean;
  onPressLeft: () => void;
  onPressRight: () => void;
  onPressClose: () => void;
}

const CardHeader: React.FC<Props> = ({
  activeLeft,
  activeRight,
  onPressLeft,
  onPressRight,
  onPressClose,
}) => {
  const theme = useAppTheme();
  return (
    <View
      style={[styles.header, { backgroundColor: theme.colors.backgroundOff }]}
    >
      <Icon onPress={onPressLeft} disabled={!activeLeft}>
        <MaterialCommunityIcons
          style={styles.iconLeft}
          size={moderateScale(24)}
          color={
            activeLeft ? theme.colors.primary : theme.colors.primaryInactive
          }
          name={'arrow-left-thin'}
        />
      </Icon>
      <Icon onPress={onPressRight} disabled={!activeRight}>
        <MaterialCommunityIcons
          style={styles.iconRight}
          size={moderateScale(24)}
          color={
            activeRight ? theme.colors.primary : theme.colors.primaryInactive
          }
          name={'arrow-right-thin'}
        />
      </Icon>
      <Icon onPress={onPressClose}>
        <MaterialCommunityIcons
          style={styles.iconClose}
          size={moderateScale(24)}
          color={theme.colors.primary}
          name='close-circle-outline'
        />
      </Icon>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: verticalScale(32),
  },
  iconLeft: {
    position: 'absolute',
    top: verticalScale(3),
    right: horizontalScale(88),
  },
  iconRight: {
    position: 'absolute',
    top: verticalScale(3),
    right: horizontalScale(48),
  },
  iconClose: {
    position: 'absolute',
    top: verticalScale(3),
    right: horizontalScale(8),
  },
});

export default CardHeader;
