import React from 'react';
import { useAppTheme } from '@/styles/colors';
import Slider, { SliderProps } from '@react-native-community/slider';

const AppSlider: React.FC<SliderProps> = ({ ...props }) => {
  const theme = useAppTheme();
  return (
    <Slider
      minimumTrackTintColor={theme.colors.primary}
      thumbTintColor={theme.colors.primary}
      {...props}
    />
  );
};

export default React.memo(AppSlider);
