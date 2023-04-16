import React, { useState } from 'react';
import { ViewStyle, StyleProp, View, StyleSheet } from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
  hoverStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

const styles = StyleSheet.create({
  hover: {
    opacity: 0.8,
  },
});

// defautlはopacityの設定のみ
const HoverableView: React.FC<Props> = ({
  style,
  hoverStyle = styles.hover,
  children,
  ...props
}) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <View
      style={[style, isHover ? hoverStyle : undefined]}
      // @ts-ignore
      onMouseEnter={(): void => setIsHover(true)}
      onMouseLeave={(): void => setIsHover(false)}
      {...props}
    >
      {children}
    </View>
  );
};

export default React.memo(HoverableView);
