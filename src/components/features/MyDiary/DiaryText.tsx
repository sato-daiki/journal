import React from 'react';
import { StyleSheet } from 'react-native';
import { AppText } from '@/components/atoms';
import { fontSizeM } from '@/styles/Common';

interface Props {
  text: string;
}

const DiaryText: React.FC<Props> = ({ text }) => {
  return (
    <AppText size='m' style={styles.text}>
      {text}
    </AppText>
  );
};

const styles = StyleSheet.create({
  text: {
    lineHeight: fontSizeM * 1.8,
  },
});

export default React.memo(DiaryText);
