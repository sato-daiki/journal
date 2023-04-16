import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { primaryColor, fontSizeM } from '@/styles/Common';
import { Language } from '@/types';
import { SavePoints } from '@/images';

import { Modal } from '@/components/template';
import { SubmitButton, WhiteButton, Space, Heading } from '@/components/atoms';

import { getBasePoints } from '@/utils/diary';
import I18n from '@/utils/I18n';

interface Props {
  visible: boolean;
  learnLanguage: Language;
  onPressSubmit: () => void;
  onPressClose: () => void;
  onPressWatchAd?: () => void;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    fontSize: fontSizeM,
    color: primaryColor,
    textAlign: 'center',
    lineHeight: fontSizeM * 1.3,
  },
  img: {
    alignSelf: 'center',
    width: 160,
    height: 160,
  },
});

const ModalLackPoint: React.FC<Props> = ({
  visible,
  learnLanguage,
  onPressSubmit,
  onPressClose,
  onPressWatchAd,
}: Props) => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Heading title={I18n.t('modalLackPoint.title')} />
        <Space size={24} />
        <Image style={styles.img} source={SavePoints} />
        <Space size={32} />
        <Text style={styles.text}>
          {I18n.t('modalLackPoint.text', {
            learnCharacters: getBasePoints(learnLanguage),
          })}
        </Text>
        <Space size={32} />
        <SubmitButton
          title={I18n.t('modalLackPoint.submit')}
          onPress={onPressSubmit}
        />
        <Space size={16} />
        <WhiteButton
          title={I18n.t('modalLackPoint.close')}
          onPress={onPressClose}
        />
        {!!onPressWatchAd && (
          <>
            <Space size={16} />
            <WhiteButton
              title={I18n.t('modalLackPoint.watchAd')}
              onPress={onPressWatchAd}
            />
          </>
        )}
      </View>
    </Modal>
  );
};

export default ModalLackPoint;
