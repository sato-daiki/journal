import React from 'react';
import {
  Text,
  TextProps,
  StyleSheet,
  TextStyle,
  StyleProp,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { fontSizeL, fontSizeM, fontSizeS } from '@/styles/Common';

type TextSize = 'l' | 'm' | 's';
type Props = {
  size: TextSize;
  bold?: boolean;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
} & TextProps;

const styles = StyleSheet.create({
  lText: {
    fontSize: fontSizeL,
    lineHeight: fontSizeL * 1.3,
  },
  mText: {
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
  },
  sText: {
    fontSize: fontSizeS,
    lineHeight: fontSizeS * 1.3,
  },
  bold: {
    fontWeight: 'bold',
  },
});

const AppText = ({ style, size, bold, children, ...props }: Props) => {
  const theme = useTheme();

  return (
    <Text
      style={[
        size === 'l'
          ? styles.lText
          : size === 'm'
          ? styles.mText
          : size === 's'
          ? styles.sText
          : null,
        bold && styles.bold,
        {
          color: theme.colors.primary,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default React.memo(AppText);
