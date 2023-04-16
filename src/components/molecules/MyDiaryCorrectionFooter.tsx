import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { fontSizeM, primaryColor, subTextColor } from '../../styles/Common';
import { SubmitButton } from '../atoms';
import I18n from '../../utils/I18n';

const styles = StyleSheet.create({
  promptText: {
    paddingTop: 16,
    textAlign: 'center',
    color: primaryColor,
    fontSize: fontSizeM,
  },
  finText: {
    textAlign: 'center',
    color: subTextColor,
    fontSize: fontSizeM,
  },
});

interface Props {
  isReview: boolean;
  onPress: () => void;
}

const MyDiaryCorrectionFooter: React.FC<Props> = ({ isReview, onPress }) => {
  if (isReview) {
    return <Text style={styles.finText}>{I18n.t('myDiaryCorrectionFooter.finText')}</Text>;
  }
  return (
    <>
      <SubmitButton title={I18n.t('myDiaryCorrectionFooter.title')} onPress={onPress} />
      <Text style={styles.promptText}>{I18n.t('myDiaryCorrectionFooter.promptText')}</Text>
    </>
  );
};

export default MyDiaryCorrectionFooter;
