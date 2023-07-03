import React from 'react';
import { StyleSheet, StyleProp, TextStyle, TextInputProps } from 'react-native';
import I18n from '@/utils/I18n';
import { MAX_TITLE } from '@/utils/diary';
import { AppTextInput } from '@/components/atoms';

type Props = {
  editable: boolean;
  style?: StyleProp<TextStyle>;
  value: string;
  onChangeText: (txt: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
} & TextInputProps;

const TextInputTitle: React.FC<Props> = ({
  editable,
  value,
  onFocus,
  onChangeText,
  onBlur,
  ...props
}: Props) => {
  return (
    <AppTextInput
      editable={editable}
      style={styles.titleInput}
      value={value}
      placeholder={I18n.t('postDiary.placeholder', { maxLength: MAX_TITLE })}
      autoCorrect={false}
      blurOnSubmit
      multiline
      keyboardType='default'
      spellCheck
      returnKeyType='done'
      onFocus={onFocus}
      onChangeText={onChangeText}
      onBlur={onBlur}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  titleInput: {
    borderRadius: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default React.memo(TextInputTitle);
