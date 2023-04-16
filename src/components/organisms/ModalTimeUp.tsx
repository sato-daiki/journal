import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { primaryColor, fontSizeM } from '@/styles/Common';
import { Modal } from '@/components/template';
import { Heading, Space, SubmitButton } from '@/components/atoms';
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
    lineHeight: fontSizeM * 1.3,
  },
});

interface Props {
  visible: boolean;
  onPressClose: () => void;
}

const ModalTimeUp: React.FC<Props> = ({ visible, onPressClose }: Props) => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Heading title={I18n.t('modalTimeUp.title')} />
        <Space size={16} />
        <MaterialCommunityIcons size={64} color={primaryColor} name='timer-off' />
        <Space size={16} />
        <Text style={styles.text}>{I18n.t('modalTimeUp.text')}</Text>
        <Space size={32} />
        <SubmitButton title='OK' onPress={onPressClose} />
      </View>
    </Modal>
  );
};

export default ModalTimeUp;
