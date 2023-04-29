import React from 'react';
import {
  StyleSheet,
  TextInput,
  StyleProp,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { fontSizeM, primaryColor, borderLightColor } from '@/styles/Common';

type Props = {
  editable: boolean;
  style?: StyleProp<TextStyle>;
  value: string;
  onChangeText: (txt: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
} & TextInputProps;

const styles = StyleSheet.create({
  titleInput: {
    fontSize: fontSizeM,
    color: primaryColor,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
  },
});

const TextInputTitle: React.FC<Props> = ({
  editable,
  value,
  onChangeText,
  onFocus,
  onBlur,
  style,
  ...props
}: Props) => {
  return (
    <TextInput
      editable={editable}
      style={[styles.titleInput, style]}
      value={value}
      placeholder='Title'
      maxLength={100}
      autoCorrect={false}
      blurOnSubmit
      keyboardType='default'
      spellCheck
      returnKeyType='done'
      underlineColorAndroid='transparent'
      onFocus={onFocus}
      multiline
      onChangeText={onChangeText}
      onBlur={onBlur}
      {...props}
    />
  );
};

export default React.memo(TextInputTitle);
