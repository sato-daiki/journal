import React, { useCallback } from 'react';
import { Text } from 'react-native';
import { Word } from '@/types';
import StyledWord from './StyledWord';

type Props = {
  words: Word[];
  activeIndex: number | null;
  setActiveIndex: (activeIndex: number | null) => void;
};

const Words: React.FC<Props> = ({ words, activeIndex, setActiveIndex }) => {
  const onPressChecked = useCallback(
    (id) => {
      setActiveIndex(id);
    },
    [setActiveIndex],
  );

  const onPressUnChecked = useCallback(() => {
    setActiveIndex(null);
  }, [setActiveIndex]);

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
