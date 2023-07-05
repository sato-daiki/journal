import React from 'react';
import { Platform, Switch, SwitchProps } from 'react-native';
import { useAppTheme, white } from '@/styles/colors';

const AppSwitch: React.FC<SwitchProps> = ({ ...props }) => {
  const theme = useAppTheme();
  if (Platform.OS === 'ios') {
    return (
      <Switch
        trackColor={{
          true: theme.colors.main,
        }}
        ios_backgroundColor={theme.colors.switchBackground}
        {...props}
      />
    );
  }
  return <Switch {...props} />;
};

export default React.memo(AppSwitch);
