import React, { useCallback } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Word } from '@/types';

type Props = {
  word: Word;
  isActive: boolean;
  onPressChecked: (checkIndex: number) => void;
};

const styles = StyleSheet.create({
  checked: {
    textDecorationLine: 'line-through',
  },
});

const StyledWord: React.FC<Props> = ({ word, isActive, onPressChecked }) => {
  const onPressTextChecked = useCallback(() => {
    if (word.checkIndex !== undefined) {
      onPressChecked(word.checkIndex);
    }
  }, [onPressChecked, word.checkIndex]);

  return (
    <Text>
      {word.checked && !word.ignore ? (
        // 1文字の時など押しやすくするためにスペースの前後にonPressTextCheckedを置く
        <Text onPress={onPressTextChecked}>
          {word.lastCharacter === ' ' || word.lastCharacter === '\n' ? '' : ' '}
          <Text
            style={[
              styles.checked,
              {
                color: word.color,
              },
              isActive && {
                backgroundColor: word.backgroundColor,
              },
            ]}
          >
            {word.text}
          </Text>{' '}
        </Text>
      ) : (
        <Text>{word.text}</Text>
      )}
    </Text>
  );
};

export default React.memo(StyledWord);
