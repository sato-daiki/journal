import React from 'react';
import {
  Text,
  TextProps,
  StyleSheet,
  TextStyle,
  StyleProp,
} from 'react-native';
import {
  fontSizeL,
  fontSizeLL,
  fontSizeLLL,
  fontSizeM,
  fontSizeS,
  fontSizeSS,
} from '@/styles/fonts';
import { useAppTheme } from '@/styles/colors';

export type TextSize = 'lll' | 'll' | 'l' | 'm' | 's' | 'ss';
type Props = {
  size: TextSize;
  bold?: boolean;
  color?: string;
  textAlign?: TextStyle['textAlign'];
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
} & TextProps;

const styles = StyleSheet.create({
  lllText: {
    fontSize: fontSizeLLL,
    lineHeight: fontSizeLLL * 1.3,
  },
  llText: {
    fontSize: fontSizeLL,
    lineHeight: fontSizeLL * 1.3,
  },
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
  ssText: {
    fontSize: fontSizeSS,
    lineHeight: fontSizeSS * 1.3,
  },
  bold: {
    fontWeight: 'bold',
  },
});

const AppText: React.FC<Props> = ({
  style,
  size,
  bold,
  color,
  textAlign,
  children,
  ...props
}) => {
  const theme = useAppTheme();
  return (
    <Text
      style={[
        size === 's'
          ? styles.sText
          : size === 'm'
          ? styles.mText
          : size === 'l'
          ? styles.lText
          : size === 'll'
          ? styles.llText
          : size === 'lll'
          ? styles.lllText
          : null,
        bold && styles.bold,
        {
          color: color ? color : theme.colors.primary,
        },
        textAlign && {
          textAlign: textAlign,
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
