import React from 'react';
import { View, StyleSheet } from 'react-native';
import I18n from '@/utils/I18n';
import { IntroductionParams } from './interface';
import Header from './Header';
import { AppImage, AppText, Space } from '@/components/atoms';
import SwipeGuid from './SwipeGuid';

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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  image: {
    marginTop: 16,
    alignSelf: 'center',
    width: 80,
    height: 80,
  },
});

export default TopicGuideIntroduction;
