import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { borderLight, useAppTheme } from '@/styles/colors';
import { moderateScale, verticalScale } from '@/styles/metrics';

interface Props {
  header: ReactNode;
  main: ReactNode;
}

const Card: React.FC<Props> = ({ header, main }) => {
  const theme = useAppTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.backgroundOff,
        },
      ]}
    >
      {header}
      {main}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderTopWidth: moderateScale(1),
    height: verticalScale(250),
    borderTopColor: borderLight,
  },
});

export default Card;
