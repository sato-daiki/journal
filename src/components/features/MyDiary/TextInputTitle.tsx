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
import { MAX_TITLE } from '@/utils/diary';

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
  style,
  ...props
}: Props) => {
  return (
    <TextInput
      editable={editable}
      style={[styles.titleInput, style]}
      value={value}
      placeholder={I18n.t('postDiary.placeholder', { maxLength: MAX_TITLE })}
      autoCorrect={false}
      blurOnSubmit
      multiline
      keyboardType='default'
      spellCheck
      returnKeyType='done'
      underlineColorAndroid='transparent'
      onFocus={onFocus}
      onChangeText={onChangeText}
      onBlur={onBlur}
      {...props}
    />
  );
};

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

export default React.memo(TextInputTitle);
