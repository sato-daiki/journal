import React, { useMemo, useRef } from 'react';
import { StyleSheet, Text, Animated, Easing } from 'react-native';

import { OptionItem, SelectTimeItem } from '@/components/molecules';

import I18n from '@/utils/I18n';
import { getShortDaysName } from '@/utils/time';
import { fontSizeM, subTextColor } from '@/styles/Common';
import { FixDay, FixTimeInfo } from '@/types';

const styles = StyleSheet.create({
  subText: {
    fontSize: fontSizeM,
    color: subTextColor,
    marginRight: 8,
  },
});

interface Props {
  disable: boolean;
  fixDays: FixDay[];
  fixTimeInfo: FixTimeInfo;
  handleTimeStart: (day: number | undefined, timeStart: Date) => void;
  handleTimeEnd: (day: number | undefined, timeEnd: Date) => void;
  onPressStudyDay: () => void;
}

const ReminderSelectTimeFix: React.FC<Props> = ({
  disable,
  fixDays,
  fixTimeInfo,
  handleTimeStart,
  handleTimeEnd,
  onPressStudyDay,
}) => {
  const animationHeight = useRef(new Animated.Value(1)).current;
  const animationOpacity = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (disable) {
      Animated.timing(animationHeight, {
        duration: 300,
        toValue: 0,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
      Animated.timing(animationOpacity, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false, // <-- neccessary
      }).start();
    } else {
      Animated.timing(animationHeight, {
        duration: 500,
        toValue: 1,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();

      Animated.timing(animationOpacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false, // <-- neccessary
      }).start();
    }
  }, [animationHeight, animationOpacity, disable]);

  const righComponent = useMemo(
    () => (
      <Text style={styles.subText}>
        {getShortDaysName(
          fixDays.filter((item) => item.checked).map((item) => item.day),
        )}
      </Text>
    ),
    [fixDays],
  );

  const maxHeight = animationHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300],
  });

  return (
    <Animated.View
      style={[
        {
          opacity: animationOpacity,
          maxHeight,
        },
      ]}
    >
      <OptionItem
        title={I18n.t('reminderSelectTime.studyDay')}
        onPress={onPressStudyDay}
        righComponent={righComponent}
      />
      <SelectTimeItem
        heading={I18n.t('reminderSelectTime.time')}
        timeStart={fixTimeInfo.timeStart}
        timeEnd={fixTimeInfo.timeEnd}
        handleTimeStart={handleTimeStart}
        handleTimeEnd={handleTimeEnd}
      />
    </Animated.View>
  );
};

export default React.memo(ReminderSelectTimeFix);
