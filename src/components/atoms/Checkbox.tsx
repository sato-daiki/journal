import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@/styles/colors';
import { Icon } from '../templates';

interface Props {
  checked?: boolean;
  disable?: boolean;
  onPress?: () => void;
}

const Checkbox: React.FC<Props> = ({ checked, disable, onPress }: Props) => {
  const theme = useAppTheme();
  if (!checked) {
    return (
      <Icon onPress={onPress} disabled={!onPress}>
        <MaterialCommunityIcons
          size={28}
          color={theme.colors.main}
          name='checkbox-blank-outline'
        />
      </Icon>
    );
  }
  return (
    <Icon onPress={onPress} disabled={!onPress}>
      <MaterialCommunityIcons
        size={28}
        color={theme.colors.main}
        name='checkbox-marked'
      />
    </Icon>
  );
};

export default React.memo(Checkbox);
