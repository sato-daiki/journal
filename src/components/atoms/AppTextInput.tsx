import React from 'react';
import { TextInputProps, TextInput, StyleSheet } from 'react-native';
import { borderLight, useAppTheme } from '@/styles/colors';
import { fontSizeM } from '@/styles/fonts';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

type Props = {
  isOff?: boolean;
} & TextInputProps;

const AppTextInput: React.FC<Props> = ({ style, isOff, ...props }) => {
  const theme = useAppTheme();
  return (
    <TextInput
      style={[
        {
          color: theme.colors.primary,
          backgroundColor: isOff
            ? theme.colors.backgroundOff
            : theme.colors.background,
        },
        styles.textInput,
        style,
      ]}
      placeholderTextColor={theme.colors.secondary}
      underlineColorAndroid='transparent'
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: moderateScale(fontSizeM, 0.2),
    lineHeight: moderateScale(fontSizeM * 1.3, 0.2),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(12), // paddingVerticalとやると効かない（react nativeのバグ）
    paddingHorizontal: horizontalScale(16),
    borderRadius: moderateScale(6),
    width: '100%',
    borderColor: borderLight,
  },
});

export default React.memo(AppTextInput);
