import React from 'react';
import { StyleSheet, View } from 'react-native';
import { borderLightColor, offWhite, primaryColor } from '@/styles/Common';
import { HoverableIcon } from '@/components/atoms';

export interface Props {
  activeLeft: boolean;
  activeRight: boolean;
  onPressLeft: () => void;
  onPressRight: () => void;
  onPressClose: () => void;
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: offWhite,
    height: 32,
    paddingHorizontal: 8,
  },
  iconLeft: {
    position: 'absolute',
    right: 80,
  },
  iconRight: {
    position: 'absolute',
    right: 40,
  },
  iconClose: {
    position: 'absolute',
    right: 0,
  },
});

const CardHeader: React.FC<Props> = ({
  activeLeft,
  activeRight,
  onPressLeft,
  onPressRight,
  onPressClose,
}) => {
  return (
    <View style={styles.header}>
      <HoverableIcon
        style={styles.iconLeft}
        icon={'community'}
        name={'arrow-left-thin'}
        size={24}
        color={activeLeft ? primaryColor : borderLightColor}
        onPress={activeLeft ? onPressLeft : undefined}
      />
      <HoverableIcon
        style={styles.iconRight}
        icon={'community'}
        name={'arrow-right-thin'}
        size={24}
        color={activeRight ? primaryColor : borderLightColor}
        onPress={activeRight ? onPressRight : undefined}
      />
      <HoverableIcon
        style={styles.iconClose}
        icon='community'
        name='close-circle-outline'
        size={24}
        onPress={onPressClose}
      />
    </View>
  );
};

export default CardHeader;
