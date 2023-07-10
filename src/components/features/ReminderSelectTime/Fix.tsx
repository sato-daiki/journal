import React, { useMemo, useRef } from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';
import { OptionItem } from '@/components/molecules';
import I18n from '@/utils/I18n';
import { getShortDaysName } from '@/utils/time';
import { FixDay, FixTimeInfo } from '@/types';
import { AppText } from '@/components/atoms';
import SelectTimeItem from './SelectTimeItem';
import { useAppTheme } from '@/styles/colors';
import { horizontalScale } from '@/styles/metrics';

interface Props {
  disable: boolean;
  fixDays: FixDay[];
  fixTimeInfo: FixTimeInfo;
  handleTimeStart: (day: number | undefined, timeStart: Date) => void;
  handleTimeEnd: (day: number | undefined, timeEnd: Date) => void;
  onPressStudyDay: () => void;
}

const Fix: React.FC<Props> = ({
  disable,
  fixDays,
  fixTimeInfo,
  handleTimeStart,
  handleTimeEnd,
  onPressStudyDay,
}) => {
  const theme = useAppTheme();
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
      <AppText size='m' color={theme.colors.secondary} style={styles.subText}>
        {getShortDaysName(
          fixDays.filter((item) => item.checked).map((item) => item.day),
        )}
      </AppText>
    ),
    [fixDays, theme.colors.secondary],
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
        type='right'
        backgroundColor={theme.colors.background}
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

const styles = StyleSheet.create({
  subText: {
    marginRight: horizontalScale(8),
  },
});

export default React.memo(Fix);
