import React, { useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { MaintenanceJson } from '@/images';
import { fontSizeM, primaryColor } from '@/styles/Common';
import I18n from '@/utils/I18n';
import { getLanguageToolCode } from '@/utils/grammarCheck';
import { LongCode } from '@/types';

type Props = {
  messageEn: string | null;
  messageJa: string | null;
};

const Maintenance: React.FC<Props> = ({ messageEn, messageJa }) => {
  const message = useMemo(() => {
    if (!messageEn && !messageJa) {
      return I18n.t('maintenance.defaultMessage');
    }
    const languageCode = getLanguageToolCode(I18n.locale as LongCode);
    if (languageCode === 'ja') {
      return messageJa || I18n.t('maintenance.defaultMessage');
    } else {
      return messageEn || I18n.t('maintenance.defaultMessage');
    }
  }, [messageEn, messageJa]);

  return (
    <View style={styles.container}>
      <LottieView
        style={styles.lottie}
        source={MaintenanceJson}
        autoPlay
        loop
      />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  lottie: {
    width: 120,
    height: 120,
    marginBottom: 32,
  },
  text: {
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    color: primaryColor,
  },
});

export default Maintenance;
