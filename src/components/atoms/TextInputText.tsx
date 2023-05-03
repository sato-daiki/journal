import React from 'react';
import {
  StyleSheet,
  TextInput,
  StyleProp,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { fontSizeM, primaryColor, borderLightColor } from '@/styles/Common';
import I18n from '@/utils/I18n';
import { MAX_TEXT } from '@/utils/diary';

type Props = {
  style?: StyleProp<TextStyle>;
  value: string;
  onChangeText: (txt: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
} & TextInputProps;

const styles = StyleSheet.create({
  textInput: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    textAlignVertical: 'top',
    flex: 1,
    borderColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
  },
});

const TextInputText: React.FC<Props> = ({
  value,
  onFocus,
  onChangeText,
  onBlur,
  style,
  ...props
}: Props) => {
  return (
    <TextInput
      style={[styles.textInput, style]}
      value={value}
      placeholder={I18n.t('postDiary.placeholder', { maxLength: MAX_TEXT })}
      autoCorrect={false}
      multiline
      keyboardType='default'
      spellCheck
      underlineColorAndroid='transparent'
      onFocus={onFocus}
      onChangeText={onChangeText}
      onBlur={onBlur}
      {...props}
    />
  );
};

export default React.memo(TextInputText);
