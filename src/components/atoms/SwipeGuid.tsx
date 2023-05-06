import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { fontSizeM, primaryColor } from '@/styles/Common';
import { Swipe } from '@/images';
import I18n from '@/utils/I18n';

type SwipeGuidType = 'end' | 'start';

interface Props {
  type: SwipeGuidType;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
  },
  right: {
    right: 16,
  },
  left: {
    left: 16,
  },
  icon: {
    width: 40,
    height: 32,
    marginBottom: 12,
  },
  text: {
    textAlign: 'center',
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
  },
});

const SwipeGuid: React.FC<Props> = ({ type }) => {
  return (
    <View
      style={[styles.container, type === 'start' ? styles.right : styles.left]}
    >
      <Image source={Swipe} style={styles.icon} />
      <Text style={styles.text}>
        {type === 'start'
          ? I18n.t('topicGuide.swipeStart')
          : I18n.t('topicGuide.swipeEnd')}
      </Text>
    </View>
  );
};

export default React.memo(SwipeGuid);
