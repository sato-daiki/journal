import React, { useCallback, useMemo } from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { HumanCorrect, Word } from '@/types';
import StyledWord from '@/components/molecules/Words/StyledWord';
import { getHumanColors } from '@/utils/grammarCheck';

type Props = {
  textStyle?: StyleProp<TextStyle>;
  humanCorrects: HumanCorrect[];
  activeIndex?: number | null;
  setActiveIndex?: (activeIndex: number | null) => void;
  setOtherIndex?: (index: null) => void;
};

const HumanWords: React.FC<Props> = ({
  textStyle,
  humanCorrects,
  activeIndex,
  setActiveIndex,
  setOtherIndex,
}) => {
  const { color, backgroundColor } = useMemo(() => {
    return getHumanColors();
  }, []);

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

  const words: Word[] = useMemo(() => {
    let index = -1;
    return humanCorrects.map((item) => {
      if (item.correction) {
        index += 1;
        return {
          text: item.original,
          checked: true,
          checkIndex: index,
          color: color,
          backgroundColor: backgroundColor,
        };
      } else {
        return {
          text: item.original,
          checked: false,
        };
      }
    });
  }, [backgroundColor, color, humanCorrects]);

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

export default HumanWords;
