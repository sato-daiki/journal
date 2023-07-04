import React from 'react';
import { Image, ImageProps } from 'react-native';
import { useAppTheme } from '@/styles/colors';

type Props = {
  tintColor?: string;
} & ImageProps;

const AppImage: React.FC<Props> = ({ tintColor, style, ...props }) => {
  const theme = useAppTheme();
  return (
    <Image
      style={[{ tintColor: tintColor || theme.colors.primary }, style]}
      {...props}
    />
  );
};

export default React.memo(AppImage);
