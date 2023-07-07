import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../../../atoms';
import { horizontalScale, moderateScale } from '@/styles/metrics';

interface Props {
  color: string;
  text: string;
}

const DiaryStatusLabel = ({ color, text }: Props) => (
  <View style={styles.container}>
    <View style={[styles.circle, { backgroundColor: color }]} />
    <AppText size='s' color={color}>
      {text}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    marginRight: horizontalScale(4),
  },
});

export default React.memo(DiaryStatusLabel);
