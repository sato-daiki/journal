import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { primaryColor, fontSizeM } from '@/styles/Common';
import { SubmitButton, WhiteButton, Space, Heading } from '@/components/atoms';
import { Modal } from '@/components/template';
import I18n from '@/utils/I18n';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    textAlign: 'center',
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.3,
  },
});

interface Props {
  visible: boolean;
  isLoading: boolean;
  onPressSave: () => void;
  onPressNotSave: () => void;
  onPressClose: () => void;
}

const ModalDiaryCancel: React.FC<Props> = ({
  visible,
  isLoading,
  onPressSave,
  onPressNotSave,
  onPressClose,
}: Props) => (
  <Modal visible={visible}>
    <View style={styles.container}>
      <Heading title={I18n.t('common.confirmation')} />
      <Space size={24} />
      <Text style={styles.text}>{I18n.t('modalDiaryCancel.message')}</Text>
      <Space size={32} />
      <SubmitButton
        isLoading={isLoading}
        title={I18n.t('modalDiaryCancel.button')}
        onPress={onPressSave}
      />
      <Space size={16} />
      <WhiteButton title={I18n.t('common.close')} onPress={onPressNotSave} />
      <Space size={16} />
      <WhiteButton title={I18n.t('common.cancel')} onPress={onPressClose} />
    </View>
  </Modal>
);

export default ModalDiaryCancel;
