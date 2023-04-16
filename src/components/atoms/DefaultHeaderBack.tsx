import React from 'react';
import { Platform } from 'react-native';
import HeaderIcon from './HeaderIcon';

interface Props {
  onPress: () => void;
}

const DefaultHeaderBack: React.FC<Props> = ({ onPress }) => {
  if (Platform.OS === 'ios') {
    return (
      <HeaderIcon
        icon="feather"
        name="chevron-left"
        size={25}
        onPress={onPress}
      />
    );
  }

  return (
    <HeaderIcon icon="material" name="arrow-back" size={25} onPress={onPress} />
  );
};

export default React.memo(DefaultHeaderBack);
