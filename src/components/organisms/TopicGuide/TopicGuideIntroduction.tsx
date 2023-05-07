import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { fontSizeM, primaryColor } from '@/styles/Common';
import { SwipeGuid } from '@/components/atoms';
import I18n from '@/utils/I18n';
import { IntroductionParams } from './interface';
import Header from './Header';

interface Props {
  params: IntroductionParams;
}

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
    marginBottom: 32,
  },
  text: {
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
  },
});

const TopicGuideIntroduction = ({ params }: Props) => {
  return (
    <View style={styles.container}>
      <Header title={I18n.t('topicGuide.introduction')} />
      <Image source={params.source} style={styles.image} />
      <Text style={styles.text}>{params.text}</Text>
      <SwipeGuid type='start' />
    </View>
  );
};

export default TopicGuideIntroduction;
