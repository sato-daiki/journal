import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { AppText } from '@/components/atoms';
import { fontSizeM } from '@/styles/fonts';

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
    lineHeight: fontSizeM * 1.8,
  },
});

export default React.memo(DiaryText);
