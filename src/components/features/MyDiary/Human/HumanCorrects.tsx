import React, { useMemo } from 'react';
import { HumanCorrect } from '@/types';
import { getHumanColors } from '@/utils/grammarCheck';
import Card from '../CommonAi/Card/Card';
import CardHeader from '../CommonAi/Card/CardHeader';
import { CardMain } from '../CommonAi/Card/CardMain';

export interface Props {
  filterArray: HumanCorrect[];
  activeIndex: number;
  activeLeft: boolean;
  activeRight: boolean;
  onPressLeft: () => void;
  onPressRight: () => void;
  onPressClose: () => void;
}

const HumanCorrects: React.FC<Props> = ({
  filterArray,
  activeIndex,
  activeLeft,
  activeRight,
  onPressLeft,
  onPressRight,
  onPressClose,
}) => {
  const { color } = useMemo(() => {
    return getHumanColors();
  }, []);

  const humanCorrect = useMemo(() => {
    return filterArray[activeIndex];
  }, [activeIndex, filterArray]);

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
          skipFirstRow
          activeText={humanCorrect.original}
          color={color}
          shortMessage={''}
          replacements={[{ value: humanCorrect.correction || '' }]}
        />
      }
    />
  );
};

export default HumanCorrects;
