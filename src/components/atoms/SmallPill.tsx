import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
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

const SmallPill: React.FC<Props> = ({
  containerStyle,
  text,
  color,
  backgroundColor,
}) => {
  return (
    <View style={[styles.container, containerStyle, { backgroundColor }]}>
      <AppText size='s' color={color}>
        {text}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(4),
    paddingVertical: verticalScale(1),
    borderRadius: moderateScale(4),
  },
});

export default React.memo(SmallPill);
