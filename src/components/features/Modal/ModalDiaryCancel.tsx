import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  SubmitButton,
  WhiteButton,
  Space,
  Heading,
  AppText,
  Modal,
} from '@/components';
import I18n from '@/utils/I18n';

interface Props {
  visible: boolean;
  isLoading: boolean;
  onPressSave?: () => void;
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
      <AppText size='m' textAlign='center'>
        {I18n.t('modalDiaryCancel.message')}
      </AppText>
      {onPressSave && (
        <>
          <Space size={32} />
          <SubmitButton
            isLoading={isLoading}
            title={I18n.t('modalDiaryCancel.button')}
            onPress={onPressSave}
          />
        </>
      )}

      <Space size={16} />
      <WhiteButton
        title={I18n.t('modalDiaryCancel.close')}
        onPress={onPressNotSave}
      />
      <Space size={16} />
      <WhiteButton title={I18n.t('common.cancel')} onPress={onPressClose} />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default ModalDiaryCancel;
