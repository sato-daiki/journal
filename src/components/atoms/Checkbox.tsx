import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@/styles/colors';

interface Props {
  checked?: boolean;
  disable?: boolean;
  onPress?: () => void;
}

const Checkbox: React.FC<Props> = ({ checked, disable, onPress }: Props) => {
  const theme = useAppTheme();
  if (!checked) {
    return (
      <MaterialCommunityIcons
        size={28}
        color={theme.colors.main}
        name='checkbox-blank-outline'
        onPress={!disable ? onPress : undefined}
      />
    );
  }
  return (
    <MaterialCommunityIcons
      size={28}
      color={theme.colors.main}
      name='checkbox-marked'
      onPress={!disable ? onPress : undefined}
    />
  );
};

export default React.memo(Checkbox);
