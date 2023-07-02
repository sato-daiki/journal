import React, { useMemo } from 'react';
import { Match } from '@/types';
import { getLanguageToolColors } from '@/utils/grammarCheck';
import Card from '../CommonAi/Card/Card';
import CardHeader from '../CommonAi/Card/CardHeader';
import { CardMain } from '../CommonAi/Card/CardMain';

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
    <Card
      header={
        <CardHeader
          activeLeft={activeLeft}
          activeRight={activeRight}
          onPressLeft={onPressLeft}
          onPressRight={onPressRight}
          onPressClose={onPressClose}
        />
      }
      main={
        <CardMain
          color={color}
          activeText={activeText}
          shortMessage={match.shortMessage || match.rule?.issueType || null}
          message={match.message}
          urls={match.rule?.urls || null}
          replacements={match.replacements}
          onPressIgnore={onPressIgnore}
        />
      }
    />
  );
};

export default Matches;
