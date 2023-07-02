import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  softRed,
  fontSizeM,
  primaryColor,
  borderLightColor,
  offWhite,
  green,
} from '../../styles/Common';
import { AppText, Icon } from '../atoms';
import { useAppTheme } from '@/styles/colors';

type Props = {
  isLoading?: boolean;
  isCheckOk?: boolean;
  isPassword?: boolean;
  errorMessage: string;
} & TextInputProps;

const CheckTextInput = (props: Props) => {
  const theme = useAppTheme();
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
            <Icon
              size={24}
              icon='community'
              name={showPassword ? 'eye' : 'eye-off'}
              color={theme.colors.secondary}
              onPress={onPressPasswordIcon}
            />
          )}
        </View>
      </View>
      {errorMessage.length > 0 ? (
        <View style={styles.errorContainer}>
          <Icon
            icon='fontAwesome'
            size={14}
            name='exclamation-circle'
            color={theme.colors.danger}
          />
          <AppText size='s' color={theme.colors.danger} style={styles.error}>
            {errorMessage}
          </AppText>
        </View>
      ) : null}
    </>
  );
};

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
    marginLeft: 6,
  },
});

export default CheckTextInput;
