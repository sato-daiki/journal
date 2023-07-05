import React from 'react';
import { StyleSheet, StyleProp, TextStyle, TextInputProps } from 'react-native';
import I18n from '@/utils/I18n';
import { MAX_TEXT } from '@/utils/diary';
import { AppTextInput } from '@/components/atoms';

type Props = {
  style?: StyleProp<TextStyle>;
  value: string;
  onChangeText: (txt: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
} & TextInputProps;

const TextInputText: React.FC<Props> = ({
  value,
  onFocus,
  onChangeText,
  onBlur,
  style,
  ...props
}: Props) => {
  return (
    <AppTextInput
      style={[styles.textInput, style]}
      value={value}
      placeholder={I18n.t('postDiary.placeholder', { maxLength: MAX_TEXT })}
      autoCorrect={false}
      multiline
      keyboardType='default'
      spellCheck
      onFocus={onFocus}
      onChangeText={onChangeText}
      onBlur={onBlur}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    borderRadius: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default React.memo(TextInputText);
