import React from 'react';
import { View, StyleSheet } from 'react-native';
import I18n from '@/utils/I18n';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppText, Space } from '../../../atoms';
import { BUSINESS_DAYS } from './NoHuman';

interface Props {}

const YetHuman: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name='face-man-shimmer'
        size={80}
        style={styles.image}
      />
      <Space size={16} />
      <AppText size='m'>
        {I18n.t('yetHuman.text', { days: BUSINESS_DAYS })}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  image: {
    alignSelf: 'center',
  },
});

export default YetHuman;
