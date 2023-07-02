import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import I18n from '@/utils/I18n';
import { Time } from '@/images';
import { AppText, Space } from '@/components/atoms';

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
        <Image source={Time} style={styles.img} />
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
    paddingTop: 16,
  },
  img: {
    alignSelf: 'center',
    width: 120,
    height: 120,
  },
});

export default React.memo(ReminderInitial);
