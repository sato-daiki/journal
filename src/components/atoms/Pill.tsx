import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import AppText from './AppText';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  text: string;
  backgroundColor: string;
  color: string;
}

const Pill: React.FC<Props> = ({
  containerStyle,
  text,
  color,
  backgroundColor,
}) => {
  return (
    <View style={[styles.container, containerStyle, { backgroundColor }]}>
      <AppText bold size='m' color={color}>
        {text}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(8),
  },
});

export default React.memo(Pill);
