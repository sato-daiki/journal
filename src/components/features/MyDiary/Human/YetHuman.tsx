import React from 'react';
import { View, StyleSheet } from 'react-native';
import I18n from '@/utils/I18n';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@/styles/colors';
import { AppText, Space } from '../../../atoms';
import { BUSINESS_DAYS } from './NoHuman';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

interface Props {}

const YetHuman: React.FC<Props> = () => {
  const theme = useAppTheme();
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        style={styles.image}
        size={moderateScale(80)}
        color={theme.colors.primary}
        name='face-man-shimmer'
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
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(32),
  },
  image: {
    alignSelf: 'center',
  },
});

export default YetHuman;
