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
import { Icon } from '../templates';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

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
              size={moderateScale(24)}
              color={green}
              name='check-circle-outline'
            />
          ) : null}
          {isPassword && (
            <Icon onPress={onPressPasswordIcon}>
              <MaterialCommunityIcons
                size={moderateScale(24)}
                color={theme.colors.secondary}
                name={showPassword ? 'eye' : 'eye-off'}
              />
            </Icon>
          )}
        </View>
      </View>
      {errorMessage.length > 0 ? (
        <View style={styles.errorContainer}>
          <FontAwesome
            size={moderateScale(14)}
            color={softRed}
            name='exclamation-circle'
          />
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
    right: horizontalScale(16),
  },
  errorBorder: {
    borderBottomWidth: moderateScale(2),
    borderWidth: moderateScale(2),
    borderColor: softRed,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(6),
    paddingRight: horizontalScale(8),
  },
  textInput: {
    paddingRight: horizontalScale(46),
    paddingVertical:
      Platform.OS === 'ios' ? verticalScale(14) : verticalScale(8),
  },
  error: {
    marginLeft: horizontalScale(6),
  },
});

export default CheckTextInput;
