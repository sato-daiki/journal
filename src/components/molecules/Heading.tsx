import React from 'react';
import {
  StyleSheet,
  View,
  TextStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';
import AppText from '../atoms/AppText';
import { useAppTheme } from '@/styles/colors';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  title: string;
}

const Heading: React.FC<Props> = ({ containerStyle, titleStyle, title }) => {
  const theme = useAppTheme();
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
      <View
        style={[styles.line, { borderBottomColor: theme.colors.borderLight }]}
      />
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
  },
});

export default React.memo(Heading);
