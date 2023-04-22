import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { HoverableIcon } from '../../atoms';
import { Match } from '@/types';
import { offWhite } from '@/styles/Common';
import { Matche } from './Match';

interface Props {
  matches: Match[];
  activeIndex: number;
  setActiveIndex: (activeIndex: number | null) => void;
}

const styles = StyleSheet.create({
  container: {
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

export const Matches: React.FC<Props> = ({
  matches,
  activeIndex,
  setActiveIndex,
}) => {
  const onPressLeft = useCallback(() => {
    if (activeIndex !== null) {
      setActiveIndex(activeIndex - 1);
    }
  }, [activeIndex, setActiveIndex]);

  const onPressRight = useCallback(() => {
    if (activeIndex !== null) {
      setActiveIndex(activeIndex + 1);
    }
  }, [activeIndex, setActiveIndex]);

  const onPressClose = () => {
    setActiveIndex(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {activeIndex !== 0 && (
          <HoverableIcon
            style={styles.iconLeft}
            icon={'community'}
            name={'arrow-left-thin'}
            size={24}
            onPress={onPressLeft}
          />
        )}
        {activeIndex !== matches.length - 1 && (
          <HoverableIcon
            style={styles.iconRight}
            icon={'community'}
            name={'arrow-right-thin'}
            size={24}
            onPress={onPressRight}
          />
        )}
        <HoverableIcon
          style={styles.iconClose}
          icon='community'
          name='close-circle-outline'
          size={24}
          onPress={onPressClose}
        />
      </View>
      <Matche match={matches[activeIndex]} />
    </View>
  );
};
