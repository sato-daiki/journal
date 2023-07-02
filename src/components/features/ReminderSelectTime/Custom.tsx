import React, { useMemo, useRef } from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';

import { OptionItem } from '@/components/molecules';
import I18n from '@/utils/I18n';
import { getShortDayName, getShortDaysName } from '@/utils/time';
import { CustomTimeInfo } from '@/types';
import { AppText } from '@/components/atoms';
import { useAppTheme } from '@/styles/colors';
import SelectTimeItem from './SelectTimeItem';

interface Props {
  disable: boolean;
  customTimeInfos: CustomTimeInfo[];
  handleTimeStart: (day: number | undefined, timeStart: Date) => void;
  handleTimeEnd: (day: number | undefined, timeEnd: Date) => void;
  onPressStudyDay: () => void;
}

const Custom: React.FC<Props> = ({
  disable,
  customTimeInfos,
  handleTimeStart,
  handleTimeEnd,
  onPressStudyDay,
}) => {
  const theme = useAppTheme();

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
      <AppText size='m' color={theme.colors.secondary} style={styles.subText}>
        {getShortDaysName(
          customTimeInfos
            .filter((item) => item.checked)
            .map((item) => item.day),
        )}
      </AppText>
    ),
    [customTimeInfos, theme.colors.secondary],
  );

  const renderRemindeDays = useMemo(
    () =>
      customTimeInfos
        .filter((item) => item.checked)
        .map((item) => (
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
    [customTimeInfos, handleTimeEnd, handleTimeStart],
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
        type='right'
        title={I18n.t('reminderSelectTime.studyDay')}
        onPress={onPressStudyDay}
        righComponent={righComponent}
      />
      {renderRemindeDays}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  subText: {
    marginRight: 8,
  },
});

export default React.memo(Custom);
