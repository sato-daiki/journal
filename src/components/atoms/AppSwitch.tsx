import React from 'react';
import { Platform, Switch, SwitchProps } from 'react-native';
import { useAppTheme, white } from '@/styles/colors';

const AppSwitch: React.FC<SwitchProps> = ({ ...props }) => {
  const theme = useAppTheme();
  return (
    <Switch
      thumbColor={
        Platform.OS === 'android' ? theme.colors.switchThumb : undefined
      }
      trackColor={{
        true: theme.colors.main,
        false: theme.colors.switchBackground,
      }}
      ios_backgroundColor={theme.colors.switchBackground}
      {...props}
    />
  );
};

export default React.memo(AppSwitch);
