import React from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/styles/colors';
import AppText from './AppText';

interface Props {
  isBorrderTop?: boolean;
  isBorrderBottom?: boolean;
  isLoading?: boolean;
  disable?: boolean;
  title: string;
  onPress: () => void;
}

const TextButtun: React.FC<Props> = ({
  isBorrderTop = false,
  isBorrderBottom = false,
  isLoading = false,
  disable = false,
  title,
  onPress,
}: Props) => {
  const theme = useAppTheme();

  const borderTopWidth = isBorrderTop ? StyleSheet.hairlineWidth : undefined;
  const borderBottomWidth = isBorrderBottom
    ? StyleSheet.hairlineWidth
    : undefined;

  return (
    <TouchableOpacity
      style={[
        styles.contaner,
        {
          backgroundColor: theme.colors.white,
          borderBottomColor: theme.colors.secondary,
          borderTopColor: theme.colors.secondary,
          borderTopWidth,
          borderBottomWidth,
        },
      ]}
      activeOpacity={isLoading || disable ? 1 : 0.2}
      onPress={isLoading || disable ? undefined : onPress}
    >
      {isLoading ? (
        <ActivityIndicator size='small' />
      ) : (
        <AppText size='m' color={theme.colors.main}>
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contaner: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
  },
});

export default React.memo(TextButtun);
