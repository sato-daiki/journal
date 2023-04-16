import React, { useMemo, useRef } from 'react';
import { StyleSheet, Text, Animated, Easing } from 'react-native';

import { OptionItem, SelectTimeItem } from '@/components/molecules';

import I18n from '@/utils/I18n';
import { getShortDayName, getShortDaysName } from '@/utils/time';
import { fontSizeM, subTextColor } from '@/styles/Common';
import { CustomTimeInfo } from '@/types';

const styles = StyleSheet.create({
  subText: {
    fontSize: fontSizeM,
    color: subTextColor,
    marginRight: 8,
  },
});

interface Props {
  disable: boolean;
  customTimeInfos: CustomTimeInfo[];
  handleTimeStart: (day: number | undefined, timeStart: Date) => void;
  handleTimeEnd: (day: number | undefined, timeEnd: Date) => void;
  onPressStudyDay: () => void;
}

const ReminderSelectTimeCustom: React.FC<Props> = ({
  disable,
  customTimeInfos,
  handleTimeStart,
  handleTimeEnd,
  onPressStudyDay,
}) => {
  const animationHeight = useRef(new Animated.Value(0)).current;
  const animationOpacity = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (disable) {
      Animated.timing(animationHeight, {
        duration: 500,
        toValue: 0,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
      Animated.timing(animationOpacity, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false, // <-- neccessary
      }).start();
    } else {
      Animated.timing(animationHeight, {
        duration: 500,
        toValue: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();

      Animated.timing(animationOpacity, {
        duration: 500,
        toValue: 1,
        easing: Easing.linear,
        useNativeDriver: false, // <-- neccessary
      }).start();
    }
  }, [animationHeight, animationOpacity, disable]);

  const righComponent = useMemo(
    () => (
      <Text style={styles.subText}>
        {getShortDaysName(
          customTimeInfos.filter(item => item.checked).map(item => item.day)
        )}
      </Text>
    ),
    [customTimeInfos]
  );

  const renderRemindeDays = useMemo(
    () =>
      customTimeInfos
        .filter(item => item.checked)
        .map(item => (
          <SelectTimeItem
            day={item.day}
            key={item.day}
            heading={getShortDayName(item.day)}
            timeStart={item.timeStart}
            handleTimeStart={handleTimeStart}
            timeEnd={item.timeEnd}
            handleTimeEnd={handleTimeEnd}
          />
        )),
    [customTimeInfos, handleTimeEnd, handleTimeStart]
  );
  const maxHeight = animationHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1000],
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
      {renderRemindeDays}
    </Animated.View>
  );
};

export default React.memo(ReminderSelectTimeCustom);
