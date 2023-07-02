import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { AppText, Space, SubmitButton } from '@/components/atoms';
import I18n from '@/utils/I18n';
import { Write } from '@/images';
import SwipeGuid from '@/components/features/TopicGuid/SwipeGuid';

interface Props {
  onPressSubmit: () => void;
}

const TopicGuideEnd: React.FC<Props> = ({ onPressSubmit }) => {
  return (
    <View style={styles.container}>
      <AppText size='l' textAlign='center'>
        {I18n.t('topicGuide.guideEndText')}
      </AppText>
      <Space size={32} />
      <Image source={Write} style={styles.image} />
      <Space size={32} />
      <SubmitButton title={I18n.t('common.begin')} onPress={onPressSubmit} />
      <SwipeGuid type='end' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
  },
});

export default TopicGuideEnd;
