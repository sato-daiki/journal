import React from 'react';
import { TextInputProps, TextInput, StyleSheet } from 'react-native';
import { borderLight, useAppTheme } from '@/styles/colors';
import { fontSizeM } from '@/styles/fonts';

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
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    paddingTop: 12,
    paddingBottom: 12, // paddingVerticalとやると効かない（react nativeのバグ）
    paddingHorizontal: 16,
    borderRadius: 6,
    width: '100%',
    borderColor: borderLight,
  },
});

export default React.memo(AppTextInput);
