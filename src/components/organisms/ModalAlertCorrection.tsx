import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Animation, CustomAnimation } from 'react-native-animatable';
import { primaryColor, fontSizeL, borderLightColor, fontSizeM } from '../../styles/Common';
import { Modal } from '../template';
import { SubmitButton, WhiteButton, Space } from '../atoms';
import I18n from '../../utils/I18n';
import { Language } from '../../types';
import { getLanguage } from '../../utils/diary';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: fontSizeL,
    color: primaryColor,
    fontWeight: 'bold',
    marginVertical: 6,
    paddingBottom: 16,
    textAlign: 'center',
  },
  line: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
    marginBottom: 24,
  },
  text: {
    textAlign: Platform.OS === 'web' ? 'center' : 'left',
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.3,
  },
  bold: {
    fontWeight: 'bold',
  },
  icon: {
    alignSelf: 'center',
  },
});

interface Props {
  visible: boolean;
  isLoading: boolean;
  animationOut?: Animation | CustomAnimation;
  teachDiaryLanguage: Language;
  onPressSubmit: () => void;
  onPressClose: () => void;
}

const ModalAlertCorrection: React.FC<Props> = ({
  visible,
  isLoading,
  animationOut,
  teachDiaryLanguage,
  onPressSubmit,
  onPressClose,
}: Props) => {
  return (
    <Modal visible={visible} animationOut={animationOut}>
      <View style={styles.container}>
        <Text style={styles.title}>{I18n.t('common.confirmation')}</Text>
        <View style={styles.line} />
        <MaterialCommunityIcons
          style={styles.icon}
          name='pencil-lock'
          size={64}
          color={primaryColor}
        />
        <Space size={16} />
        <Text style={styles.text}>
          {I18n.t('modalAlertCorrection.text1')}
          <Text style={styles.bold}>{getLanguage(teachDiaryLanguage)}</Text>
          {I18n.t('modalAlertCorrection.text2')}
        </Text>
        <Space size={32} />
        <SubmitButton
          isLoading={isLoading}
          title={I18n.t('modalAlertCorrection.start')}
          onPress={onPressSubmit}
        />
        <Space size={16} />
        <WhiteButton title={I18n.t('common.cancel')} onPress={onPressClose} />
      </View>
    </Modal>
  );
};

export default ModalAlertCorrection;
