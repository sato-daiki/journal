import {
  borderLightColor,
  fontSizeM,
  offWhite,
  primaryColor,
} from '@/styles/Common';
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export interface Props {
  value: string;
  onChangeText: (value: string) => void;
}

const EmailTextInput: React.FC<Props> = ({ value, onChangeText }) => {
  return (
    <TextInput
      style={styles.textInput}
      value={value}
      onChangeText={onChangeText}
      maxLength={50}
      placeholder='Enter your email address'
      keyboardType='email-address'
      autoCapitalize='none'
      autoCorrect={false}
      underlineColorAndroid='transparent'
      returnKeyType='done'
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    fontSize: fontSizeM,
    color: primaryColor,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: offWhite,
    borderRadius: 6,
    borderColor: borderLightColor,
    marginBottom: 16,
  },
});

export default EmailTextInput;
