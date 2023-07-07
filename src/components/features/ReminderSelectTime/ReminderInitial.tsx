import React from 'react';
import { View, StyleSheet } from 'react-native';
import I18n from '@/utils/I18n';
import { Time } from '@/images';
import { AppText, Space, AppImage } from '@/components/atoms';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

const ReminderInitial: React.FC = () => {
  return (
    <>
      <View style={styles.main}>
        <AppText size='l' bold textAlign='center'>
          {I18n.t('onboarding.reminderInitial')}
        </AppText>
        <Space size={16} />
        <AppText size='m' textAlign='center'>
          {I18n.t('reminderInitial.text')}
        </AppText>
      </View>
      <View style={styles.imgContainer}>
        <AppImage source={Time} style={styles.img} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  imgContainer: {
    flex: 2,
    paddingTop: verticalScale(16),
  },
  img: {
    alignSelf: 'center',
    width: moderateScale(120),
    height: moderateScale(120),
  },
});

export default React.memo(ReminderInitial);
