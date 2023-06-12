import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import I18n from '@/utils/I18n';
import { Space } from '../atoms';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSizeM, primaryColor } from '@/styles/Common';
import { BUSINESS_DAYS } from './NoHuman';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  image: {
    alignSelf: 'center',
  },
  text: {
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
  },
});

interface Props {}

const YetHuman: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        size={80}
        color={primaryColor}
        name='face-man-shimmer'
        style={styles.image}
      />
      <Space size={16} />
      <Text style={styles.text}>
        {I18n.t('yetHuman.text', { days: BUSINESS_DAYS })}
      </Text>
    </View>
  );
};

export default YetHuman;
