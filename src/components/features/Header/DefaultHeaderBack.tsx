import React from 'react';
import { Platform } from 'react-native';
import Icon from '@/components/atoms/Icon';
import HeaderIcon from './HeaderIcon';

interface Props {
  onPress: () => void;
}

const DefaultHeaderBack: React.FC<Props> = ({ onPress }) => {
  if (Platform.OS === 'ios') {
    return (
      <HeaderIcon>
        <Icon icon='feather' name='chevron-left' size={25} onPress={onPress} />
      </HeaderIcon>
    );
  }

  return (
    <HeaderIcon>
      <Icon icon='feather' name='chevron-left' size={25} onPress={onPress} />
    </HeaderIcon>
  );
};

export default React.memo(DefaultHeaderBack);
