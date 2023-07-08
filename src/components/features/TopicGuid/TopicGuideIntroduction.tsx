import React from 'react';
import { View, StyleSheet } from 'react-native';
import I18n from '@/utils/I18n';
import { IntroductionParams } from './interface';
import Header from './Header';
import { AppImage, AppText, Space } from '@/components/atoms';
import SwipeGuid from './SwipeGuid';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

interface Props {
  params: IntroductionParams;
}

const TopicGuideIntroduction = ({ params }: Props) => {
  return (
    <View style={styles.container}>
      <Header title={I18n.t('topicGuide.introduction')} />
      <AppImage source={params.source} style={styles.image} />
      <Space size={32} />
      <AppText size='m'>{params.text}</AppText>
      <SwipeGuid type='start' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(16),
  },
  image: {
    marginTop: verticalScale(16),
    alignSelf: 'center',
    width: moderateScale(80),
    height: moderateScale(80),
  },
});

export default TopicGuideIntroduction;
