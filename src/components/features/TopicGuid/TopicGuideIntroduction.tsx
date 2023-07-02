import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import I18n from '@/utils/I18n';
import { IntroductionParams } from './interface';
import Header from './Header';
import SwipeGuid from '@/components/features/TopicGuid/SwipeGuid';
import { AppText, Space } from '@/components/atoms';

interface Props {
  params: IntroductionParams;
}

const TopicGuideIntroduction = ({ params }: Props) => {
  return (
    <View style={styles.container}>
      <Header title={I18n.t('topicGuide.introduction')} />
      <Image source={params.source} style={styles.image} />
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
