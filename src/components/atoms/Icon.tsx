import React, { useCallback } from 'react';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
} from '@expo/vector-icons';
import { StyleProp, TextStyle } from 'react-native';
import { useAppTheme } from '@/styles/colors';

export type IconType = 'material' | 'community' | 'feather' | 'fontAwesome';

type Props = {
  style?: StyleProp<TextStyle>;
  disabled?: boolean;
  icon: IconType;
  size: number;
  name: any;
  color?: string;
  onPress?: () => void;
};

const Icon: React.FC<Props> = ({
  style,
  icon,
  name,
  size,
  color: propsColor,
  disabled,
  onPress: propsPress,
}) => {
  const theme = useAppTheme();
  const onPress = useCallback(() => {
    if (!disabled) {
      propsPress;
    }
  }, [disabled, propsPress]);

  if (icon === 'material') {
    return (
      <MaterialIcons
        style={style}
        name={name}
        size={size}
        color={propsColor || theme.colors.primary}
        onPress={onPress}
      />
    );
  }
  if (icon === 'community') {
    return (
      <MaterialCommunityIcons
        style={style}
        name={name}
        size={size}
        color={propsColor || theme.colors.primary}
        onPress={onPress}
      />
    );
  }
  if (icon === 'feather') {
    return (
      <Feather
        style={style}
        name={name}
        size={size}
        color={propsColor || theme.colors.primary}
        onPress={onPress}
      />
    );
  }
  if (icon === 'fontAwesome') {
    return (
      <FontAwesome
        style={style}
        name={name}
        size={size}
        color={propsColor || theme.colors.primary}
        onPress={onPress}
      />
    );
  }
  return null;
};

export default React.memo(Icon);
