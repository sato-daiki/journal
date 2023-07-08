import { verticalScale } from '@/styles/metrics';
import React from 'react';
import { View } from 'react-native';

interface Props {
  size: number;
}

const Space: React.FC<Props> = ({ size }: Props) => {
  return <View style={{ paddingBottom: verticalScale(size) }} />;
};

export default React.memo(Space);
