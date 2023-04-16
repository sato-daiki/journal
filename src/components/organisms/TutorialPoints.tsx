import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { primaryColor, fontSizeM } from '../../styles/Common';
import { Space } from '../atoms';
import { BagPoints } from '../../images';
import Tutorial from '../template/Tutorial';
import I18n from '../../utils/I18n';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.3,
    textAlign: Platform.OS === 'web' ? 'center' : 'left',
  },
  img: {
    alignSelf: 'center',
    width: 80,
    height: 80,
  },
});

interface Props {
  isLoading?: boolean;
  displayed: boolean;
  buttonText?: string;
  onPress?: () => void;
}

const TutorialPoints: React.FC<Props> = ({
  isLoading = false,
  displayed,
  buttonText = I18n.t('tutorialPoints.buttonText'),
  onPress = (): void => undefined,
}: Props) => {
  return (
    <Tutorial
      displayed={displayed}
      isLoading={isLoading}
      title={I18n.t('tutorialPoints.title')}
      buttonText={buttonText}
      onPress={onPress}
    >
      <View style={styles.container}>
        <Image style={styles.img} source={BagPoints} resizeMode='contain' />
        <Space size={24} />
        <Text style={styles.text}>{I18n.t('tutorialPoints.text')}</Text>
      </View>
    </Tutorial>
  );
};

export default TutorialPoints;
