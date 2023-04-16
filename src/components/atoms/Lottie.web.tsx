/* eslint-disable react/display-name */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LottieViewWeb from 'react-native-web-lottie';

type Props = {
  style?: StyleProp<ViewStyle>;
  source: {
    uri: string;
  };
  autoPlay: boolean;
  loop: boolean;
};

const Lottie: React.FC<Props> = React.forwardRef(({ style, source, autoPlay, loop }, ref) => {
  return <LottieViewWeb ref={ref} style={style} source={source} autoPlay={autoPlay} loop={loop} />;
});

export default Lottie;
