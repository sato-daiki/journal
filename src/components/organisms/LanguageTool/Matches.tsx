import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { offWhite } from '@/styles/Common';
import { Match } from '@/types';
import { Card } from '../Card/Card';
import { getLanguageToolColors } from '@/utils/grammarCheck';
import CardHeader from '../Card/CardHeader';

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
  container: {
    paddingHorizontal: 8,
    backgroundColor: offWhite,
    height: 180,
  },
});

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
  const { color } = useMemo(() => {
    return getLanguageToolColors(matches[activeIndex]);
  }, [activeIndex, matches]);

  const match = useMemo(() => {
    return matches[activeIndex];
  }, [activeIndex, matches]);

  return (
    <View style={styles.container}>
      <CardHeader
        activeLeft={activeLeft}
        activeRight={activeRight}
        onPressLeft={onPressLeft}
        onPressRight={onPressRight}
        onPressClose={onPressClose}
      />
      <Card
        color={color}
        shortMessage={match.shortMessage || match.rule?.issueType}
        message={match.message}
        urls={match?.rule?.urls}
        replacements={match.replacements}
        onPressIgnore={onPressIgnore}
      />
    </View>
  );
};

export default Matches;
