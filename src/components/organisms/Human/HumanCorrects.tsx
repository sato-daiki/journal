import React, { useMemo } from 'react';
import { View } from 'react-native';
import { HumanCorrect } from '@/types';
import { Card } from '@/components/organisms/Card/Card';
import { getHumanColors } from '@/utils/grammarCheck';
import CardHeader from '../Card/CardHeader';
import { styles } from '../LanguageTool/Matches';

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
    <View style={styles.container}>
      <CardHeader
        activeLeft={activeLeft}
        activeRight={activeRight}
        onPressLeft={onPressLeft}
        onPressRight={onPressRight}
        onPressClose={onPressClose}
      />
      <Card
        skipFirstRow
        activeText={humanCorrect.original}
        color={color}
        shortMessage={''}
        replacements={[{ value: humanCorrect.correction || '' }]}
      />
    </View>
  );
};

export default HumanCorrects;
