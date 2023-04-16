import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import I18n from '@/utils/I18n';
import { fontSizeL, fontSizeM, primaryColor } from '@/styles/Common';
import { Time } from '@/images';

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
  title: {
    color: primaryColor,
    fontSize: fontSizeL,
    fontWeight: 'bold',
    paddingBottom: 16,
    textAlign: 'center',
  },
  text: {
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    textAlign: 'center',
  },
});

const ReminderInitial: React.FC = () => {
  return (
    <>
      <View style={styles.main}>
        <Text style={styles.title}>{I18n.t('onboarding.reminderInitial')}</Text>
        <Text style={styles.text}>{I18n.t('reminderInitial.text')}</Text>
      </View>
      <View style={styles.imgContainer}>
        <Image source={Time} style={styles.img} />
      </View>
    </>
  );
};

export default React.memo(ReminderInitial);
