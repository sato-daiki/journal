import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  TextInputProps,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from '@expo/vector-icons';
import { AppText, AppTextInput } from '../atoms';
import { green, softRed, useAppTheme } from '@/styles/colors';

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
        <AppTextInput
          isOff
          autoCapitalize='none'
          autoCorrect={false}
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
            <MaterialIcons
              size={24}
              name='check-circle-outline'
              color={green}
            />
          ) : null}
          {isPassword && (
            <MaterialCommunityIcons
              size={24}
              name={showPassword ? 'eye' : 'eye-off'}
              color={theme.colors.secondary}
              onPress={onPressPasswordIcon}
            />
          )}
        </View>
      </View>
      {errorMessage.length > 0 ? (
        <View style={styles.errorContainer}>
          <FontAwesome size={14} name='exclamation-circle' color={softRed} />
          <AppText size='s' color={softRed} style={styles.error}>
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
    borderBottomWidth: 2,
    borderWidth: 2,
    borderColor: softRed,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    paddingRight: 8,
  },
  textInput: {
    paddingRight: 46,
    paddingVertical: Platform.OS === 'ios' ? 14 : 8,
  },
  error: {
    marginLeft: 6,
  },
});

export default CheckTextInput;
