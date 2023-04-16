import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { mainColor } from '../../styles/Common';

interface Props {
  checked?: boolean;
  disable?: boolean;
  color?: string;
  onPress?: () => void;
}

const Checkbox: React.FC<Props> = ({ checked, disable, color = mainColor, onPress }: Props) => {
  if (!checked) {
    return (
      <MaterialCommunityIcons
        size={28}
        color={color}
        name='checkbox-blank-outline'
        onPress={!disable ? onPress : undefined}
      />
    );
  }
  return (
    <MaterialCommunityIcons
      size={28}
      color={color}
      name='checkbox-marked'
      onPress={!disable ? onPress : undefined}
    />
  );
};

export default React.memo(Checkbox);
