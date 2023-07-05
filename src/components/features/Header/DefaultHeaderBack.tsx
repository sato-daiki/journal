import React from 'react';
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import HeaderIcon from './HeaderIcon';

interface Props {
  onPress: () => void;
}

const DefaultHeaderBack: React.FC<Props> = ({ onPress }) => {
  if (Platform.OS === 'ios') {
    return (
      <HeaderIcon>
        <Feather name='chevron-left' size={25} onPress={onPress} />
      </HeaderIcon>
    );
  }

  return (
    <HeaderIcon>
      <Feather name='chevron-left' size={25} onPress={onPress} />
    </HeaderIcon>
  );
};

export default React.memo(DefaultHeaderBack);
