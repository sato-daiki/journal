import React, { useCallback, useMemo } from 'react';
import { Tag, Word } from '@/types';
import { getProWritingAidColors } from '@/utils/grammarCheck';
import WrapperStyledWord from '../StyledWord/WrapperStyledWord';
import StyledWord from '../StyledWord';

type Props = {
  isTitle: boolean;
  text: string;
  tags: Tag[] | [];
  activeIndex?: number | null;
  setActiveIndex?: (activeIndex: number | null) => void;
  setOtherIndex?: (index: null) => void;
};

const ProWritingAidWords: React.FC<Props> = ({
  isTitle,
  text,
  tags,
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
      if (index < tags.length && currentOffset === tags[index].startPos) {
        const tagWard = text.substring(currentOffset, tags[index].endPos + 1);
        const { color, backgroundColor } = getProWritingAidColors(tags[index]);
        temmWords.push({
          text: tagWard,
          checked: true,
          checkIndex: index,
          color,
          backgroundColor,
          lastCharacter,
          ignore: false,
        });
        lastCharacter = tagWard.slice(-1);
        currentOffset = tags[index].endPos + 2;
        index++;
      }
      const notTagText = text.substring(
        currentOffset,
        index < tags.length ? tags[index].startPos - 1 : text.length,
      );
      temmWords.push({
        text: notTagText,
        checked: false,
      });
      lastCharacter = notTagText.slice(-1);
      if (index < tags.length) {
        currentOffset = tags[index].startPos;
      } else {
        finish = true;
      }
    }
    return temmWords;
  }, [tags, text]);

  return (
    <WrapperStyledWord isTitle={isTitle} onPress={onPressUnChecked}>
      {!!words &&
        words.length > 0 &&
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

export default ProWritingAidWords;
