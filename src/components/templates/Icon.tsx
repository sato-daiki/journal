import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

type Props = {
  children: React.ReactNode;
} & TouchableOpacityProps;

const Icon: React.FC<Props> = ({ children, onPress, ...props }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} {...props}>
      {children}
    </TouchableOpacity>
  );
};

export default Icon;
