import React from 'react';
import {
  Text,
  TextProps,
  StyleSheet,
  TextStyle,
  StyleProp,
} from 'react-native';
import { fontSizeL, fontSizeM, fontSizeS } from '@/styles/Common';
import { useAppTheme } from '@/styles/colors';

export type TextSize = 'l' | 'm' | 's';
type Props = {
  size: TextSize;
  bold?: boolean;
  color?: string;
  textAlign?: TextStyle['textAlign'];
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

const AppText = ({
  style,
  size,
  bold,
  color,
  textAlign,
  children,
  ...props
}: Props) => {
  const theme = useAppTheme();

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
