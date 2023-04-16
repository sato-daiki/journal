import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { primaryColor, fontSizeM } from '@/styles/Common';
import I18n from '@/utils/I18n';
import { Modal } from '@/components/template';
import { WhiteButton, Space, Heading } from '@/components/atoms';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    textAlign: 'center',
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    color: primaryColor,
  },
});

interface Props {
  visible: boolean;
  onPressClose: () => void;
}

const ModalSendEmail: React.FC<Props> = ({ visible, onPressClose }: Props) => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Heading title={I18n.t('modalSendEmail.title')} />
        <Space size={24} />
        <Text style={styles.text}>{I18n.t('modalSendEmail.text')}</Text>
        <Space size={32} />
        <WhiteButton title={I18n.t('common.close')} onPress={onPressClose} />
      </View>
    </Modal>
  );
};

export default ModalSendEmail;
