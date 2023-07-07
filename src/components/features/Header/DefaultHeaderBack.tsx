import React from 'react';
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import HeaderIcon from './HeaderIcon';
import { useAppTheme } from '@/styles/colors';
import Icon from '@/components/templates/Icon';

interface Props {
  onPress: () => void;
}

const DefaultHeaderBack: React.FC<Props> = ({ onPress }) => {
  const theme = useAppTheme();
  if (Platform.OS === 'ios') {
    return (
      <HeaderIcon>
        <Icon onPress={onPress}>
          <Feather name='chevron-left' size={25} color={theme.colors.primary} />
        </Icon>
      </HeaderIcon>
    );
  }

  return (
    <HeaderIcon>
      <Icon onPress={onPress}>
        <Feather name='chevron-left' size={25} color={theme.colors.primary} />
      </Icon>
    </HeaderIcon>
  );
};

export default React.memo(DefaultHeaderBack);
