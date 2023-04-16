import React from 'react';
import { getTime } from '@/utils/time';

import { Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fontSizeM, mainColor, primaryColor } from '@/styles/Common';

type Props = {
  date: Date;
  onPress: () => void;
};

const styles = StyleSheet.create({
  border: {
    borderColor: mainColor,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
  },
  text: {
    fontSize: fontSizeM,
    color: primaryColor,
  },
});

const TimeBox: React.FC<Props> = ({ onPress, date }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.border}>
      <Text style={styles.text}>{getTime(date)}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(TimeBox);
