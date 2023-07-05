import React from 'react';
import {
  StyleSheet,
  View,
  TextStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';
import AppText from '../atoms/AppText';
import { borderLight } from '@/styles/colors';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  title: string;
}

const Heading: React.FC<Props> = ({ containerStyle, titleStyle, title }) => {
  return (
    <View style={containerStyle}>
      <AppText
        size='l'
        bold
        textAlign='center'
        style={[styles.title, titleStyle]}
      >
        {title}
      </AppText>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginVertical: 6,
    paddingBottom: 16,
  },
  line: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLight,
  },
});

export default React.memo(Heading);
