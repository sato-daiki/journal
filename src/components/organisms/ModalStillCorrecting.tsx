import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { primaryColor, fontSizeM } from '@/styles/Common';
import { Modal } from '@/components/template';
import { SubmitButton, Space, Heading } from '@/components/atoms';
import I18n from '@/utils/I18n';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: fontSizeM,
    color: primaryColor,
  },
});

interface Props {
  visible: boolean;
  isLoading: boolean;
  onPress: () => void;
}

const ModalStillCorrecting: React.FC<Props> = ({ visible, isLoading, onPress }: Props) => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Heading title={I18n.t('common.error')} />
        <Space size={24} />
        <MaterialIcons name='error' size={64} color={primaryColor} />
        <Space size={16} />
        <Text style={styles.text}>{I18n.t('modalStillCorrecting.text')}</Text>
        <Space size={32} />
        <SubmitButton title={I18n.t('common.close')} isLoading={isLoading} onPress={onPress} />
      </View>
    </Modal>
  );
};

export default React.memo(ModalStillCorrecting);
