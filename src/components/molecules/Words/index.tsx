import React, { useCallback, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Word } from '@/types';
import { fontSizeM, mainColor, softRed } from '@/styles/Common';
import StyledWord from './StyledWord';

type Props = {
  words: Word[];
};

const styles = StyleSheet.create({
  common: {
    fontSize: fontSizeM,
  },
  checked: {
    textDecorationLine: 'line-through',
  },
});

const Words: React.FC<Props> = ({ words }) => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const onPressChecked = useCallback((id) => {
    setActiveId(id);
  }, []);

  const onPressUnChecked = useCallback(() => {
    setActiveId(null);
  }, []);

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
