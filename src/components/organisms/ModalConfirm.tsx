import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { primaryColor, fontSizeM } from '@/styles/Common';
import { Modal } from '@/components/template';
import { SubmitButton, WhiteButton, Space, Heading } from '@/components/atoms';
import I18n from '@/utils/I18n';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    textAlign: Platform.OS === 'web' ? 'center' : 'left',
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    color: primaryColor,
  },
});

interface Props {
  visible: boolean;
  isLoading?: boolean;
  title: string;
  message: string;
  mainButtonText?: string;
  cancelButtonText?: string;
  onPressMain?: () => void;
  onPressClose?: () => void;
}

const ModalConfirm: React.FC<Props> = ({
  visible,
  isLoading = false,
  title,
  message,
  mainButtonText = '',
  cancelButtonText = I18n.t('common.cancel'),
  onPressMain,
  onPressClose,
}: Props) => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Heading title={title} />
        <Space size={24} />
        <Text style={styles.text}>{message}</Text>
        <Space size={32} />
        {onPressMain ? (
          <>
            <SubmitButton isLoading={isLoading} title={mainButtonText} onPress={onPressMain} />
            <Space size={16} />
          </>
        ) : null}
        {onPressClose ? <WhiteButton title={cancelButtonText} onPress={onPressClose} /> : null}
      </View>
    </Modal>
  );
};

export default ModalConfirm;
