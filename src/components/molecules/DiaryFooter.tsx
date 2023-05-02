import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { fontSizeS, subTextColor } from '../../styles/Common';
import I18n from '@/utils/I18n';

type Props = {
  text: string;
};

const styles = StyleSheet.create({
  textLength: {
    color: subTextColor,
    fontSize: fontSizeS,
    textAlign: 'right',
  },
});

const DiaryHeader: React.FC<Props> = ({ text }) => {
  return (
    <Text style={styles.textLength}>
      {I18n.t('postDiaryComponent.textLength')}
      {` ${text.length}`}
    </Text>
  );
};

export default DiaryHeader;
