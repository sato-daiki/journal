import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import AppText from './AppText';

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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
});

export default React.memo(Pill);
