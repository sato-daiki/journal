import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  SubmitButton,
  WhiteButton,
  Space,
  Heading,
  Modal,
  AppText,
} from '@/components';
import I18n from '@/utils/I18n';

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
        <AppText size='m'>{message}</AppText>
        <Space size={32} />
        {onPressMain ? (
          <>
            <SubmitButton
              isLoading={isLoading}
              title={mainButtonText}
              onPress={onPressMain}
            />
            <Space size={16} />
          </>
        ) : null}
        {onPressClose ? (
          <WhiteButton title={cancelButtonText} onPress={onPressClose} />
        ) : null}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default ModalConfirm;
