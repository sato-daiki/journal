import React from 'react';
import { View } from 'react-native';
import { verticalScale } from '@/styles/metrics';

interface Props {
  size: number;
}

const Space: React.FC<Props> = ({ size }: Props) => {
  return <View style={{ paddingBottom: verticalScale(size) }} />;
};

export default React.memo(Space);
