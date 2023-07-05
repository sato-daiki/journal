import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from '@/components';
import { useAppTheme } from '@/styles/colors';

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
      <Icon
        style={styles.iconLeft}
        icon={'community'}
        name={'arrow-left-thin'}
        size={24}
        color={activeLeft ? theme.colors.primary : theme.colors.primaryInactive}
        onPress={activeLeft ? onPressLeft : undefined}
      />
      <Icon
        style={styles.iconRight}
        icon={'community'}
        name={'arrow-right-thin'}
        size={24}
        color={
          activeRight ? theme.colors.primary : theme.colors.primaryInactive
        }
        onPress={activeRight ? onPressRight : undefined}
      />
      <Icon
        style={styles.iconClose}
        icon='community'
        name='close-circle-outline'
        size={24}
        onPress={onPressClose}
      />
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
