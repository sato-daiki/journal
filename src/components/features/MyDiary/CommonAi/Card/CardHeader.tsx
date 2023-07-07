import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@/styles/colors';
import { Icon } from '@/components';

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
          name={'arrow-left-thin'}
          size={24}
          color={
            activeLeft ? theme.colors.primary : theme.colors.primaryInactive
          }
        />
      </Icon>
      <Icon onPress={onPressRight} disabled={!activeRight}>
        <MaterialCommunityIcons
          style={styles.iconRight}
          name={'arrow-right-thin'}
          size={24}
          color={
            activeRight ? theme.colors.primary : theme.colors.primaryInactive
          }
        />
      </Icon>
      <Icon onPress={onPressClose}>
        <MaterialCommunityIcons
          style={styles.iconClose}
          name='close-circle-outline'
          size={24}
          color={theme.colors.primary}
        />
      </Icon>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 32,
  },
  iconLeft: {
    position: 'absolute',
    top: 3,
    right: 88,
  },
  iconRight: {
    position: 'absolute',
    top: 3,
    right: 48,
  },
  iconClose: {
    position: 'absolute',
    top: 3,
    right: 8,
  },
});

export default CardHeader;
