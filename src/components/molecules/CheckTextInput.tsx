import React, { ReactNode } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  softRed,
  fontSizeS,
  fontSizeM,
  primaryColor,
  borderLightColor,
  offWhite,
  green,
} from '../../styles/Common';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIcon: {
    position: 'absolute',
    right: 16,
    paddingTop: 2,
  },
  errorBorder: {
    borderColor: softRed,
    borderBottomWidth: 2,
    borderWidth: 2,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    paddingRight: 8,
  },
  textInput: {
    width: '100%',
    fontSize: fontSizeM,
    color: primaryColor,
    paddingLeft: 16,
    paddingRight: 46,
    paddingVertical: Platform.OS === 'ios' ? 14 : 8,
    backgroundColor: offWhite,
    borderRadius: 6,
    borderColor: borderLightColor,
  },
  error: {
    color: softRed,
    fontSize: fontSizeS,
    marginLeft: 6,
  },
});

type Props = {
  isLoading?: boolean;
  isCheckOk?: boolean;
  errorMessage: string;
} & TextInputProps;

const CheckTextInput = (props: Props) => {
  const { isCheckOk = false, isLoading = false, errorMessage } = props;

  const rightIcon = (): ReactNode => {
    if (isLoading) {
      return <ActivityIndicator style={styles.rightIcon} size='small' />;
    }
    if (isCheckOk) {
      return (
        <MaterialCommunityIcons
          style={styles.rightIcon}
          size={24}
          name='check-circle-outline'
          color={green}
        />
      );
    }
    return null;
  };

  return (
    <>
      <View style={styles.row}>
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          underlineColorAndroid='transparent'
          style={[styles.textInput, errorMessage.length > 0 ? styles.errorBorder : {}]}
          {...props}
        />
        {rightIcon()}
      </View>
      {errorMessage.length > 0 ? (
        <View style={styles.errorContainer}>
          <FontAwesome size={fontSizeM} name='exclamation-circle' color={softRed} />
          <Text style={styles.error}>{errorMessage}</Text>
        </View>
      ) : null}
    </>
  );
};

export default CheckTextInput;
