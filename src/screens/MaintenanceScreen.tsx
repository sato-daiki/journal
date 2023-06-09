import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { MaintenanceJson } from '@/images';
import I18n from '@/utils/I18n';
import { getLanguageToolCode } from '@/utils/grammarCheck';
import { LongCode } from '@/types';
import { AppText } from '@/components/atoms';
import { Layout } from '@/components/templates';
import { horizontalScale, verticalScale } from '@/styles/metrics';

type Props = {
  messageEn: string | null;
  messageJa: string | null;
};

const MaintenanceScreen: React.FC<Props> = ({ messageEn, messageJa }) => {
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
    <Layout innerStyle={styles.container}>
      <LottieView
        style={styles.lottie}
        source={MaintenanceJson}
        autoPlay
        loop
      />
      <AppText size='m'>{message}</AppText>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(16),
  },
  lottie: {
    width: horizontalScale(120),
    height: verticalScale(120),
    marginBottom: verticalScale(32),
  },
});

export default MaintenanceScreen;
