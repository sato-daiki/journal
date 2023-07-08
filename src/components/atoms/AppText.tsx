import React from 'react';
import {
  Text,
  TextProps,
  StyleSheet,
  TextStyle,
  StyleProp,
  Platform,
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
import { moderateScale } from '@/styles/metrics';

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
    fontSize: moderateScale(fontSizeLLL),
    lineHeight: moderateScale(fontSizeLLL) * 1.3,
  },
  llText: {
    fontSize: moderateScale(fontSizeLL),
    lineHeight: moderateScale(fontSizeLL) * 1.3,
  },
  lText: {
    fontSize: moderateScale(fontSizeL),
    lineHeight: moderateScale(fontSizeL) * 1.3,
  },
  mText: {
    fontSize: moderateScale(fontSizeM),
    lineHeight: moderateScale(fontSizeM) * 1.3,
  },
  sText: {
    fontSize: moderateScale(fontSizeS),
    lineHeight: moderateScale(fontSizeS) * 1.3,
  },
  ssText: {
    fontSize: moderateScale(fontSizeSS),
    lineHeight: moderateScale(fontSizeSS) * 1.3,
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
