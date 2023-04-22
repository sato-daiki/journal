import React, { useCallback } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import I18n from '@/utils/I18n';

import { fontSizeM, primaryColor, borderLightColor } from '@/styles/Common';
import TimePicker from './TimePicker';

interface Props {
  day?: number;
  disable?: boolean;
  heading: string;
  isBorrderTop?: boolean;
  timeStart: Date;
  timeEnd: Date;
  handleTimeStart: (day: number | undefined, time: Date) => void;
  handleTimeEnd: (day: number | undefined, time: Date) => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 48,
    paddingLeft: 16,
    paddingRight: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: fontSizeM,
    color: primaryColor,
  },
  marginRight8: {
    marginRight: 8,
  },
  marginRight12: {
    marginRight: 12,
  },
  heading: {
    fontSize: fontSizeM,
    color: primaryColor,
    marginRight: 16,
  },
  opacity: {
    opacity: 0.4,
  },
});
const SelectTimeItem = ({
  day,
  disable,
  heading,
  isBorrderTop = false,
  timeStart,
  timeEnd,
  handleTimeStart,
  handleTimeEnd,
}: Props) => {
  const borderTopWidth = isBorrderTop ? 0.5 : undefined;

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
    <View
      style={[styles.container, { borderTopWidth }, disable && styles.opacity]}
    >
      <Text style={[styles.heading]}>{heading}</Text>
      <View style={styles.row}>
        <View style={[styles.row, styles.marginRight12]}>
          <Text style={[styles.text, styles.marginRight8]}>
            {I18n.t('reminderSelectTime.start')}
          </Text>
          <TimePicker date={timeStart} onChange={onChangeTimeStart} />
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, styles.marginRight8]}>
            {I18n.t('reminderSelectTime.end')}
          </Text>
          <TimePicker date={timeEnd} onChange={onChangeTimeEnd} />
        </View>
      </View>
    </View>
  );
};

export default React.memo(SelectTimeItem);
