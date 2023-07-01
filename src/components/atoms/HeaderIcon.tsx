import React from 'react';
import { StyleSheet } from 'react-native';
import HoverableIcon from './HoverableIcon';
import { IconType } from './Icon';
import { useAppTheme } from '@/styles/colors';

interface Props {
  icon: IconType;
  size?: number;
  name: string;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});

const HeaderIcon: React.FC<Props> = ({
  icon,
  name,
  size = 28,
  onPress,
}: Props) => {
  const theme = useAppTheme();

  return (
    <HoverableIcon
      style={styles.container}
      icon={icon}
      name={name}
      size={size}
      color={theme.colors.primary}
      onPress={onPress}
    />
  );
};

export default React.memo(HeaderIcon);
