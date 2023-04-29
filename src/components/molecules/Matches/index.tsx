import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { borderLightColor, offWhite, primaryColor } from '@/styles/Common';
import { Match } from '@/types';
import { HoverableIcon } from '@/components/atoms';
import { Card } from './Card';

export interface Props {
  matches: Match[];
  activeIndex: number;
  activeLeft: boolean;
  activeRight: boolean;
  onPressLeft: () => void;
  onPressRight: () => void;
  onPressClose: () => void;
  onPressIgnore: () => void;
}

const styles = StyleSheet.create({
  matchContainer: {
    paddingHorizontal: 8,
    backgroundColor: offWhite,
    height: 180,
  },
  header: {
    height: 32,
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

/**
 * 日記詳細
 */
const Matches: React.FC<Props> = ({
  matches,
  activeIndex,
  activeLeft,
  activeRight,
  onPressLeft,
  onPressRight,
  onPressClose,
  onPressIgnore,
}) => {
  return (
    <View style={styles.matchContainer}>
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
      <Card match={matches[activeIndex]} onPressIgnore={onPressIgnore} />
    </View>
  );
};

export default Matches;
