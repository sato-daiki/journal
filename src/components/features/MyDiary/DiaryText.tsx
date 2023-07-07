import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { AppText } from '@/components/atoms';
import { fontSizeM } from '@/styles/fonts';
import { moderateScale } from '@/styles/metrics';

export interface Props {
  children: ReactNode;
}

const DiaryText: React.FC<Props> = ({ children }) => {
  return (
    <AppText size='m' style={styles.text}>
      {children}
    </AppText>
  );
};

const styles = StyleSheet.create({
  text: {
    lineHeight: moderateScale(fontSizeM * 1.8),
  },
});

export default React.memo(DiaryText);
