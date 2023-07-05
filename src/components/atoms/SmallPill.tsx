import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import AppText from './AppText';

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
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
});

export default React.memo(SmallPill);
