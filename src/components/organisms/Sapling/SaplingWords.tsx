import React, { useCallback, useMemo } from 'react';
import { StyleProp, Text, TextStyle, View } from 'react-native';
import { Edit, Word } from '@/types';
import { getSaplingColors } from '@/utils/grammarCheck';
import StyledWord from '@/components/molecules/Words/StyledWord';
import { TouchableNativeFeedback } from 'react-native';

type Props = {
  textStyle?: StyleProp<TextStyle>;
  text: string;
  edits: Edit[] | [];
  activeIndex?: number | null;
  setActiveIndex?: (activeIndex: number | null) => void;
  setOtherIndex?: (index: null) => void;
};

const SaplingWords: React.FC<Props> = ({
  textStyle,
  text,
  edits,
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

    let temmWords: Word[] = [];

    while (!finish) {
      if (
        index < edits.length &&
        currentOffset === edits[index].sentence_start + edits[index].start
      ) {
        const editWard = text.substring(
          currentOffset,
          currentOffset + edits[index].end - edits[index].start,
        );

        const { color, backgroundColor } = getSaplingColors(edits[index]);

        temmWords.push({
          text: editWard,
          checked: true,
          checkIndex: index,
          color,
          backgroundColor,
          ignore: false,
        });
        currentOffset =
          currentOffset + edits[index].end - edits[index].start + 1;
        index++;
      }
      const notEditText = text.substring(
        currentOffset,
        index < edits.length
          ? edits[index].sentence_start + edits[index].start - 1
          : text.length,
      );
      temmWords.push({
        text: notEditText,
        checked: false,
      });
      if (index < edits.length) {
        currentOffset = edits[index].sentence_start + edits[index].start;
      } else {
        finish = true;
      }
    }

    return temmWords;
  }, [edits, text]);

  return (
    <TouchableNativeFeedback onPress={onPressUnChecked}>
      <View>
        <Text style={textStyle}>
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
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default SaplingWords;
