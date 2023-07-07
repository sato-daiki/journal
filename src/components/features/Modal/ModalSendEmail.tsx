import React from 'react';
import { View, StyleSheet } from 'react-native';
import I18n from '@/utils/I18n';
import { Modal, WhiteButton, Space, Heading, AppText } from '@/components';
import { horizontalScale, verticalScale } from '@/styles/metrics';

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
        <AppText size='m' textAlign='center'>
          {I18n.t('modalSendEmail.text')}
        </AppText>
        <Space size={32} />
        <WhiteButton title={I18n.t('common.close')} onPress={onPressClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
  },
});

export default ModalSendEmail;
