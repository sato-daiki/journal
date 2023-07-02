import React from 'react';
import { Switch, SwitchProps } from 'react-native';
import { useAppTheme } from '@/styles/colors';

const AppSwitch: React.FC<SwitchProps> = ({ ...props }) => {
  const theme = useAppTheme();
  return <Switch trackColor={{ true: theme.colors.main }} {...props} />;
};

export default React.memo(AppSwitch);
