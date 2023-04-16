import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { borderLightColor, fontSizeL, primaryColor } from '@/styles/Common';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  title: string;
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSizeL,
    color: primaryColor,
    fontWeight: 'bold',
    marginVertical: 6,
    paddingBottom: 16,
    textAlign: 'center',
  },
  line: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
  },
});

const Heading: React.FC<Props> = ({ containerStyle, titleStyle, title }) => {
  return (
    <View style={containerStyle}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <View style={styles.line} />
    </View>
  );
};

export default React.memo(Heading);
