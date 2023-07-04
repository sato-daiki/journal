import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import I18n from '@/utils/I18n';

import TimePicker from '../../molecules/TimePicker';
import { borderLight } from '@/styles/colors';
import { AppText } from '@/components/atoms';

interface Props {
  day?: number;
  disable?: boolean;
  heading: string;
  timeStart: Date;
  timeEnd: Date;
  handleTimeStart: (day: number | undefined, time: Date) => void;
  handleTimeEnd: (day: number | undefined, time: Date) => void;
}

const SelectTimeItem = ({
  day,
  disable,
  heading,
  timeStart,
  timeEnd,
  handleTimeStart,
  handleTimeEnd,
}: Props) => {
  const onChangeTimeStart = useCallback(
    (time: Date) => {
      handleTimeStart(day, time);
    },
    [day, handleTimeStart],
  );

  const onChangeTimeEnd = useCallback(
    (time: Date) => {
      handleTimeEnd(day, time);
    },
    [day, handleTimeEnd],
  );

  return (
    <View style={[styles.container, disable && styles.opacity]}>
      <AppText size='m' style={styles.heading}>
        {heading}
      </AppText>
      <View style={styles.row}>
        <View style={[styles.row, styles.marginRight12]}>
          <AppText size='m' style={styles.marginRight8}>
            {I18n.t('reminderSelectTime.start')}
          </AppText>
          <TimePicker date={timeStart} onChange={onChangeTimeStart} />
        </View>
        <View style={styles.row}>
          <AppText size='m' style={styles.marginRight8}>
            {I18n.t('reminderSelectTime.end')}
          </AppText>
          <TimePicker date={timeEnd} onChange={onChangeTimeEnd} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    paddingLeft: 16,
    paddingRight: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLight,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRight8: {
    marginRight: 8,
  },
  marginRight12: {
    marginRight: 12,
  },
  heading: {
    marginRight: 16,
  },
  opacity: {
    opacity: 0.4,
  },
});

export default React.memo(SelectTimeItem);
