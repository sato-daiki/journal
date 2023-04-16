import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
  StyleSheet,
} from 'react-native';

import { fontSizeM, linkBlue } from '@/styles/Common';
import Hoverable from './Hoverable';

const styles = StyleSheet.create({
  linkText: {
    fontSize: fontSizeM,
    color: linkBlue,
  },
  hoverText: {
    borderBottomColor: linkBlue,
    borderBottomWidth: 1,
  },
});

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  hoverStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  text: string;
};

const LinkText: React.FC<Props> = ({
  onPress,
  text,
  containerStyle,
  hoverStyle,
  textStyle,
}) => (
  <Hoverable
    style={containerStyle}
    onPress={onPress}
    hoverStyle={[styles.hoverText, hoverStyle]}
  >
    <Text style={[styles.linkText, textStyle]}>{text}</Text>
  </Hoverable>
);

export default React.memo(LinkText);
