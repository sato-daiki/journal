import { horizontalScale } from '@/styles/metrics';
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  children: ReactNode;
}

const HeaderIcon: React.FC<Props> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: horizontalScale(10),
  },
});

export default React.memo(HeaderIcon);
