import React, { useCallback, useMemo } from 'react';
import { Match, Word } from '@/types';
import { getLanguageToolColors } from '@/utils/grammarCheck';
import WrapperStyledWord from '../StyledWord/WrapperStyledWord';
import StyledWord from '../StyledWord';

type Props = {
  isTitle: boolean;
  text: string;
  matches: Match[] | [];
  activeIndex?: number | null;
  setActiveIndex?: (activeIndex: number | null) => void;
  setOtherIndex?: (index: null) => void;
};

const LanguageToolWords: React.FC<Props> = ({
  isTitle,
  text,
  matches,
  activeIndex,
  setActiveIndex,
  setOtherIndex,
}) => {
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

  const words = useMemo(() => {
    let currentOffset = 0;
    let index = 0;
    let finish = false;
    let lastCharacter = '';
    let temmWords: Word[] = [];

    while (!finish) {
      if (index < matches.length && currentOffset === matches[index].offset) {
        const matchWard = text.substring(
          currentOffset,
          currentOffset + matches[index].length,
        );
        const { color, backgroundColor } = getLanguageToolColors(
          matches[index],
        );
        temmWords.push({
          text: matchWard,
          checked: true,
          checkIndex: index,
          color,
          backgroundColor,
          lastCharacter,
          ignore: false,
        });
        lastCharacter = matchWard.slice(-1);
        currentOffset = currentOffset + matches[index].length + 1;
        index++;
      }
      const notMatchText = text.substring(
        currentOffset,
        index < matches.length ? matches[index].offset - 1 : text.length,
      );
      temmWords.push({
        text: notMatchText,
        checked: false,
      });
      lastCharacter = notMatchText.slice(-1);
      if (index < matches.length) {
        currentOffset = matches[index].offset;
      } else {
        finish = true;
      }
    }
    return temmWords;
  }, [matches, text]);

  return (
    <WrapperStyledWord isTitle={isTitle} onPress={onPressUnChecked}>
      {!!words &&
        words.map((word, index) => (
          <StyledWord
            key={index}
            isActive={
              !word.ignore &&
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

export default LanguageToolWords;
