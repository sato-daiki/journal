import React from 'react';
import { Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { fontSizeM, mainColor, hoverMain } from '../../styles/Common';
import Hoverable from './Hoverable';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  text: string;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  text: {
    color: mainColor,
    fontSize: fontSizeM,
  },
  hover: {
    borderRadius: 16,
    backgroundColor: hoverMain,
  },
});

const HeaderText: React.FC<Props> = ({ containerStyle, text, onPress }: Props) => {
  return (
    <Hoverable
      style={[styles.container, containerStyle]}
      hoverStyle={styles.hover}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </Hoverable>
  );
};

export default React.memo(HeaderText);
