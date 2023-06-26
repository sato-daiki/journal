import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  softRed,
  fontSizeS,
  fontSizeM,
  primaryColor,
  borderLightColor,
  offWhite,
  green,
  subTextColor,
} from '../../styles/Common';
import { HoverableIcon, Icon } from '../atoms';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconRow: {
    position: 'absolute',
    right: 16,
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
  isPassword?: boolean;
  errorMessage: string;
} & TextInputProps;

const CheckTextInput = (props: Props) => {
  const {
    isCheckOk = false,
    isLoading = false,
    isPassword = false,
    errorMessage,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const onPressPasswordIcon = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  return (
    <>
      <View style={styles.row}>
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          underlineColorAndroid='transparent'
          style={[
            styles.textInput,
            errorMessage.length > 0 ? styles.errorBorder : {},
          ]}
          secureTextEntry={isPassword && !showPassword ? true : false}
          {...props}
        />
        <View style={styles.iconRow}>
          {isLoading ? (
            <ActivityIndicator size='small' />
          ) : isCheckOk ? (
            <Icon
              size={24}
              icon='material'
              name='check-circle-outline'
              color={green}
            />
          ) : null}
          {isPassword && (
            <HoverableIcon
              size={24}
              icon='community'
              name={showPassword ? 'eye-off' : 'eye'}
              color={subTextColor}
              onPress={onPressPasswordIcon}
            />
          )}
        </View>
      </View>
      {errorMessage.length > 0 ? (
        <View style={styles.errorContainer}>
          <Icon
            icon='fontAwesome'
            size={fontSizeM}
            name='exclamation-circle'
            color={softRed}
          />
          <Text style={styles.error}>{errorMessage}</Text>
        </View>
      ) : null}
    </>
  );
};

export default CheckTextInput;
