import React from 'react';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
} from '@expo/vector-icons';

import { mainColor, primaryColor } from '../../styles/Common';
import { StyleProp, TextStyle } from 'react-native';

export type IconType = 'material' | 'community' | 'feather' | 'fontAwesome';

type Props = {
  style?: StyleProp<TextStyle>;
  isHover?: boolean;
  icon: IconType;
  size: number;
  name: any;
  color?: string;
  hoverColor?: string;
};

// defautlはopacityの設定のみ
const Icon: React.FC<Props> = ({
  style,
  isHover,
  icon,
  name,
  size,
  color = primaryColor,
  hoverColor = mainColor,
}) => {
  if (icon === 'material') {
    return (
      <MaterialIcons
        style={style}
        name={name}
        size={size}
        color={isHover ? hoverColor : color}
      />
    );
  }
  if (icon === 'community') {
    return (
      <MaterialCommunityIcons
        style={style}
        name={name}
        size={size}
        color={isHover ? hoverColor : color}
      />
    );
  }
  if (icon === 'feather') {
    return (
      <Feather
        style={style}
        name={name}
        size={size}
        color={isHover ? hoverColor : color}
      />
    );
  }
  if (icon === 'fontAwesome') {
    return (
      <FontAwesome
        style={style}
        name={name}
        size={size}
        color={isHover ? hoverColor : color}
      />
    );
  }
  return null;
};

export default React.memo(Icon);
