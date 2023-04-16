import React, { useCallback, useState } from 'react';
import {
  ViewStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
  hoverStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
} & TouchableOpacityProps;

// defautlはopacityの設定のみ
const Hoverable: React.FC<Props> = ({
  style,
  hoverStyle = { opacity: 0.8 },
  children,
  ...props
}) => {
  const [isHover, setIsHover] = useState(false);
  const onMouseEnter = useCallback(() => {
    setIsHover(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);

  return (
    <TouchableOpacity
      style={[style, isHover ? hoverStyle : undefined]}
      // @ts-ignore
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

export default React.memo(Hoverable);
