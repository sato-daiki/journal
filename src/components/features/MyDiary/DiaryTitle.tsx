import React, { ReactNode } from 'react';
import { TextProps, StyleSheet } from 'react-native';
import { AppText } from '@/components/atoms';

type Props = {
  children: ReactNode;
} & TextProps;

const DiaryTitle: React.FC<Props> = ({ children, ...props }) => {
  return (
    <AppText size='m' bold style={styles.title} {...props}>
      {children}
    </AppText>
  );
};

const styles = StyleSheet.create({
  title: {
    flex: 1,
  },
});

export default React.memo(DiaryTitle);
