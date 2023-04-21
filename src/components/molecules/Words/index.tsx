import React, { useCallback } from 'react';
import { Text } from 'react-native';
import { Word } from '@/types';
import StyledWord from './StyledWord';

type Props = {
  words: Word[];
  activeId: number | null;
  setActiveId: (activeId: number | null) => void;
};

const Words: React.FC<Props> = ({ words, activeId, setActiveId }) => {
  const onPressChecked = useCallback(
    (id) => {
      setActiveId(id);
    },
    [setActiveId],
  );

  const onPressUnChecked = useCallback(() => {
    setActiveId(null);
  }, [setActiveId]);

  return (
    <Text>
      {words &&
        words.map((word, index) => (
          <StyledWord
            key={index}
            isActive={word.checked && !word.ignore && activeId === word.checkId}
            word={word}
            onPressChecked={onPressChecked}
            onPressUnChecked={onPressUnChecked}
          />
        ))}
    </Text>
  );
};

export default Words;
