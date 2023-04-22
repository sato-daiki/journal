import React, { useCallback } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Word } from '@/types';
import { fontSizeM, mainColor, softRed } from '@/styles/Common';

type Props = {
  word: Word;
  isActive: boolean;
  onPressChecked: (checkIndex: number) => void;
  onPressUnChecked: () => void;
};

const styles = StyleSheet.create({
  common: {
    fontSize: fontSizeM,
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
              color: word.underline === 'error' ? softRed : mainColor,
            },
            isActive && {
              opacity: 0.3,
              backgroundColor: word.underline === 'error' ? softRed : mainColor,
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
