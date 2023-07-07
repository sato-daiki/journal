import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../../../atoms';

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
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
});

export default React.memo(DiaryStatusLabel);
