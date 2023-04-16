import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { fontSizeL, primaryColor } from '@/styles/Common';
import { SubmitButton, SwipeGuid } from '@/components/atoms';
import I18n from '@/utils/I18n';
import { Write } from '@/images';

interface Props {
  onPressSubmit: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: primaryColor,
    fontSize: fontSizeL,
    lineHeight: fontSizeL * 1.3,
    textAlign: 'center',
    marginBottom: 32,
  },
  image: {
    width: 70,
    height: 70,
    marginBottom: 32,
  },
});

const ThemeGuideEnd: React.FC<Props> = ({ onPressSubmit }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{I18n.t('themeGuide.guideEndText')}</Text>
      <Image source={Write} style={styles.image} />
      <SubmitButton title={I18n.t('common.begin')} onPress={onPressSubmit} />
      <SwipeGuid type="end" />
    </View>
  );
};

export default ThemeGuideEnd;
