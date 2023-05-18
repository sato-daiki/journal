import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { borderLightColor, offWhite } from '@/styles/Common';
import { Match } from '@/types';
import { Card } from '../Card/Card';
import { getLanguageToolColors } from '@/utils/grammarCheck';
import CardHeader from '../Card/CardHeader';

export interface Props {
  text: string;
  matches: Match[];
  activeIndex: number;
  activeLeft: boolean;
  activeRight: boolean;
  onPressLeft: () => void;
  onPressRight: () => void;
  onPressClose: () => void;
  onPressIgnore: () => void;
}

export const styles = StyleSheet.create({
  container: {
    borderTopColor: borderLightColor,
    borderTopWidth: 1,
    backgroundColor: offWhite,
    height: 240,
  },
});

const Matches: React.FC<Props> = ({
  text,
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

  const activeText = useMemo(() => {
    if (text) {
      try {
        return text.substring(match.offset, match.offset + match.length);
      } catch (err: any) {
        console.warn(err);
        return '';
      }
    }
    return '';
  }, [match, text]);

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
        activeText={activeText}
        shortMessage={match.shortMessage || match.rule?.issueType || null}
        message={match.message}
        urls={match.rule?.urls || null}
        replacements={match.replacements}
        onPressIgnore={onPressIgnore}
      />
    </View>
  );
};

export default Matches;
