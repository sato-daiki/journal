import React from 'react';
import { TextInputProps, TextInput, StyleSheet } from 'react-native';
import { useAppTheme } from '@/styles/colors';
import { fontSizeM } from '@/styles/Common';

const styles = StyleSheet.create({
  textInput: {
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    paddingTop: 12,
    paddingBottom: 12, // paddingVerticalとやると効かない（react nativeのバグ）
    paddingHorizontal: 16,
    borderRadius: 6,
    width: '100%',
  },
});

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
          borderColor: theme.colors.borderLight,
        },
        styles.textInput,
        style,
      ]}
      placeholderTextColor={theme.colors.secondary}
      underlineColorAndroid='transparent' // 共通
      {...props}
    />
  );
};

export default React.memo(AppTextInput);
