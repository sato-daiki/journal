import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Swipe } from '@/images';
import I18n from '@/utils/I18n';
import { AppImage, AppText } from '@/components/atoms';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

type SwipeGuidType = 'end' | 'start';

interface Props {
  type: SwipeGuidType;
}

const SwipeGuid: React.FC<Props> = ({ type }) => {
  return (
    <View
      style={[styles.container, type === 'start' ? styles.right : styles.left]}
    >
      <AppImage source={Swipe} style={styles.icon} />
      <AppText size='m' textAlign='center'>
        {type === 'start'
          ? I18n.t('topicGuide.swipeStart')
          : I18n.t('topicGuide.swipeEnd')}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
  },
  right: {
    right: horizontalScale(16),
  },
  left: {
    left: horizontalScale(16),
  },
  icon: {
    width: moderateScale(40),
    height: moderateScale(32),
    marginBottom: verticalScale(12),
  },
});

export default React.memo(SwipeGuid);
