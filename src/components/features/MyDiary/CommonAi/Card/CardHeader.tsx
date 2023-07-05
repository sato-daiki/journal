import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
      <MaterialCommunityIcons
        style={styles.iconLeft}
        name={'arrow-left-thin'}
        size={24}
        color={activeLeft ? theme.colors.primary : theme.colors.primaryInactive}
        onPress={activeLeft ? onPressLeft : undefined}
      />
      <MaterialCommunityIcons
        style={styles.iconRight}
        name={'arrow-right-thin'}
        size={24}
        color={
          activeRight ? theme.colors.primary : theme.colors.primaryInactive
        }
        onPress={activeRight ? onPressRight : undefined}
      />
      <MaterialCommunityIcons
        style={styles.iconClose}
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
