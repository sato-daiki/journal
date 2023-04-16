import React from 'react';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';

import { mainColor, primaryColor } from '../../styles/Common';

export type IconType = 'material' | 'community' | 'feather';

type Props = {
  isHover?: boolean;
  icon: IconType;
  size: number;
  name: any;
  color?: string;
  hoverColor?: string;
};

// defautlはopacityの設定のみ
const Icon: React.FC<Props> = ({
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
        name={name}
        size={size}
        color={isHover ? hoverColor : color}
      />
    );
  }
  if (icon === 'community') {
    return (
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={isHover ? hoverColor : color}
      />
    );
  }
  if (icon === 'feather') {
    return (
      <Feather name={name} size={size} color={isHover ? hoverColor : color} />
    );
  }
  return null;
};

export default React.memo(Icon);
