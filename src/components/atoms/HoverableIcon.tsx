import React, { useCallback, useState } from 'react';
import {
  ViewStyle,
  StyleProp,
  TouchableOpacity,
  View,
  TouchableOpacityProps,
  TextStyle,
} from 'react-native';
import { mainColor, hoverMain, primaryColor } from '@/styles/Common';
import Icon, { IconType } from './Icon';

type Props = {
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
  hoverStyle?: StyleProp<ViewStyle>;
  icon: IconType;
  name: string;
  size: number;
  hoverBorderRadius?: number;
  hoverPadding?: number;
  color?: string;
  hoverColor?: string;
  hoverBackgroundColor?: string;
  onPress?: () => void;
} & TouchableOpacityProps;

// defautlはopacityの設定のみ
const HoverableIcon: React.FC<Props> = ({
  style,
  iconStyle,
  icon,
  name,
  size,
  color = primaryColor,
  hoverColor = mainColor,
  hoverBackgroundColor = hoverMain,
  hoverBorderRadius = 24,
  hoverPadding = 4,
  onPress,
  ...props
}) => {
  const [isHover, setIsHover] = useState(false);

  const touchableOpacityStyle = [
    {
      borderRadius: hoverBorderRadius,
      padding: hoverPadding,
    },
    style,
    isHover ? { backgroundColor: hoverBackgroundColor } : undefined,
  ];

  const onMouseEnter = useCallback(() => {
    setIsHover(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);

  return onPress ? (
    <TouchableOpacity
      style={touchableOpacityStyle}
      // @ts-ignore
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onPress={onPress}
      {...props}
    >
      <Icon
        style={iconStyle}
        isHover={isHover}
        icon={icon}
        name={name}
        size={size}
        color={color}
        hoverColor={hoverColor}
      />
    </TouchableOpacity>
  ) : (
    // onPressがnullの時反応しないため
    <View
      style={touchableOpacityStyle}
      // @ts-ignore
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      <Icon
        style={iconStyle}
        isHover={isHover}
        icon={icon}
        name={name}
        size={size}
        color={color}
        hoverColor={hoverColor}
      />
    </View>
  );
};

export default React.memo(HoverableIcon);
