import React, { useCallback, useMemo } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Word } from '@/types';
import {
  fontSizeM,
  purple,
  purpleOpacy,
  softRed,
  softRedOpacy,
  yellow,
  yellowOpacy,
} from '@/styles/Common';

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

  const colors = useMemo(() => {
    if (word.type === 'error') {
      return { text: softRed, background: softRedOpacy };
    } else if (word.type === 'warning') {
      return { text: yellow, background: yellowOpacy };
    }
    return { text: purple, background: purpleOpacy };
  }, [word.type]);

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
