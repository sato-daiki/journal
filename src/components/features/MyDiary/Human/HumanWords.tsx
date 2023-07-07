import React, { useCallback, useMemo } from 'react';
import { HumanCorrect, Word } from '@/types';
import { getHumanColors } from '@/utils/grammarCheck';
import WrapperStyledWord from '../StyledWord/WrapperStyledWord';
import StyledWord from '../StyledWord';

type Props = {
  isTitle: boolean;
  humanCorrects: HumanCorrect[];
  activeIndex?: number | null;
  setActiveIndex?: (activeIndex: number | null) => void;
  setOtherIndex?: (index: null) => void;
};

const HumanWords: React.FC<Props> = ({
  isTitle,
  humanCorrects,
  activeIndex,
  setActiveIndex,
  setOtherIndex,
}) => {
  const { color, backgroundColor } = useMemo(() => {
    return getHumanColors();
  }, []);

  const onPressChecked = useCallback(
    (id) => {
      setOtherIndex && setOtherIndex(null);
      setActiveIndex && setActiveIndex(id);
    },
    [setActiveIndex, setOtherIndex],
  );

  const onPressUnChecked = useCallback(() => {
    setActiveIndex && setActiveIndex(null);
    setOtherIndex && setOtherIndex(null);
  }, [setActiveIndex, setOtherIndex]);

  const words: Word[] = useMemo(() => {
    let index = -1;
    let lastCharacter = '';
    return humanCorrects.map((item) => {
      let tempWord;
      if (item.correction) {
        index += 1;
        tempWord = {
          text: item.original,
          checked: true,
          checkIndex: index,
          color,
          backgroundColor,
          lastCharacter,
        };
      } else {
        tempWord = {
          text: item.original,
          checked: false,
        };
      }
      lastCharacter = item.original.slice(-1);
      return tempWord;
    });
  }, [backgroundColor, color, humanCorrects]);

  return (
    <WrapperStyledWord isTitle={isTitle} onPress={onPressUnChecked}>
      {!!words &&
        words.length > 0 &&
        words.map((word, index) => (
          <StyledWord
            key={index}
            isActive={
              activeIndex !== null &&
              word.checkIndex !== undefined &&
              activeIndex === word.checkIndex
            }
            word={word}
            onPressChecked={onPressChecked}
          />
        ))}
    </WrapperStyledWord>
  );
};

export default HumanWords;
