import React from 'react';
import { fontSizeL } from './fonts';
import { AppTheme } from '@/styles/colors';
import { Platform } from 'react-native';
import DefaultHeaderBack from '@/components/features/Header/DefaultHeaderBack';

export const getDefaultScreenOptions = (theme: AppTheme) => {
  return {
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
    headerTitleStyle: {
      color: theme.colors.primary,
      fontWeight: (Platform.OS === 'ios' ? '700' : '500') as '700' | '500',
      fontSize: fontSizeL,
    },
    headerTintColor: theme.colors.primary,
    cardStyle: {
      borderRightWidth: 1,
      borderRightColor: theme.colors.primary,
    },
    headerBackTitleStyle: {
      display: 'none' as 'none',
    },
    headerLeft: (props) => {
      const { onPress } = props;
      if (!onPress) return null;
      return <DefaultHeaderBack onPress={onPress} />;
    },
  };
};
