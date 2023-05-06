import React, { useCallback } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Word } from '@/types';
import { fontSizeM } from '@/styles/Common';

type Props = {
  word: Word;
  isActive: boolean;
  onPressChecked: (checkIndex: number) => void;
  onPressUnChecked: () => void;
};

const styles = StyleSheet.create({
  common: {
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.8,
  },
  checked: {
    textDecorationLine: 'line-through',
  },
});

const StyledWord: React.FC<Props> = ({
  word,
  isActive,
  onPressChecked,
  onPressUnChecked,
}) => {
  const onPressTextChecked = useCallback(() => {
    if (word.checkIndex !== undefined) {
      onPressChecked(word.checkIndex);
    }
  }, [onPressChecked, word.checkIndex]);

  return (
    <Text>
      {word.checked && !word.ignore ? (
        <Text
          style={[
            styles.common,
            styles.checked,
            {
              color: word.color,
            },
            isActive && {
              backgroundColor: word.backgroundColor,
              fontWeight: 'bold',
            },
          ]}
          onPress={onPressTextChecked}
        >
          {word.text}
        </Text>
      ) : (
        <Text style={styles.common} onPress={onPressUnChecked}>
          {word.text}
        </Text>
      )}{' '}
    </Text>
  );
};

export default React.memo(StyledWord);
