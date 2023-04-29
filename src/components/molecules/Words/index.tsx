import React, { useCallback, useMemo } from 'react';
import { Text } from 'react-native';
import { Match, Word } from '@/types';
import StyledWord from './StyledWord';
import { getColors } from '@/utils/languageTool';

type Props = {
  text: string;
  matches: Match[];
  activeIndex?: number | null;
  setActiveIndex?: (activeIndex: number | null) => void;
};

const Words: React.FC<Props> = ({
  text,
  matches,
  activeIndex,
  setActiveIndex,
}) => {
  const onPressChecked = useCallback(
    (id) => {
      setActiveIndex && setActiveIndex(id);
    },
    [setActiveIndex],
  );

  const onPressUnChecked = useCallback(() => {
    setActiveIndex && setActiveIndex(null);
  }, [setActiveIndex]);

  const words = useMemo(() => {
    let currentOffset = 0;
    let index = 0;
    let finish = false;

    let temmWords: Word[] = [];

    while (!finish) {
      if (index < matches.length && currentOffset === matches[index].offset) {
        const matchWard = text.substring(
          currentOffset,
          currentOffset + matches[index].length,
        );
        const { color, backgroundColor } = getColors(matches[index]);
        temmWords.push({
          text: matchWard,
          checked: true,
          checkIndex: index,
          color,
          backgroundColor,
          ignore: false,
        });
        currentOffset = currentOffset + matches[index].length + 1;
        index++;
      }
      const notMatchText = text.substring(
        currentOffset,
        index < matches.length ? matches[index].offset - 1 : text.length,
      );
      const splitTexts = notMatchText.split(' ');
      for (let j = 0; j < splitTexts.length; j++) {
        temmWords.push({
          text: splitTexts[j],
          checked: false,
        });
      }

      if (index < matches.length) {
        currentOffset = matches[index].offset;
      } else {
        finish = true;
      }
    }
    return temmWords;
  }, [matches, text]);

  return (
    <Text>
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
            onPressUnChecked={onPressUnChecked}
          />
        ))}
    </Text>
  );
};

export default Words;
