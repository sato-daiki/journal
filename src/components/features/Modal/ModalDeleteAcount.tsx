import React from 'react';
import { View, StyleSheet } from 'react-native';
import I18n from '@/utils/I18n';
import {
  Modal,
  WhiteButton,
  Space,
  SubmitButton,
  Heading,
  CheckTextInput,
  AppText,
} from '@/components';
import { horizontalScale, verticalScale } from '@/styles/metrics';

interface Props {
  visible: boolean;
  isLoading: boolean;
  isPasswordInput: boolean;
  password: string;
  errorMessage: string;
  onChangeText: (text: string) => void;
  onPressDelete1: () => void;
  onPressDelete2: () => void;
  onBlur: () => void;
  onPressClose: () => void;
}

const ModalDeleteAcount: React.FC<Props> = ({
  visible,
  isPasswordInput,
  isLoading,
  password,
  errorMessage,
  onChangeText,
  onPressDelete1,
  onPressDelete2,
  onPressClose,
  onBlur,
}: Props) => {
  if (!isPasswordInput) {
    // 削除の最終確認
    return (
      <Modal visible={visible}>
        <View style={styles.container}>
          <Heading title={I18n.t('common.confirmation')} />
          <Space size={24} />
          <AppText size='m'>{I18n.t('deleteAcount.confirmation')}</AppText>
          <Space size={40} />
          <View style={styles.button}>
            <SubmitButton
              title={I18n.t('deleteAcount.withdrawal')}
              onPress={onPressDelete1}
            />
            <Space size={16} />
            <WhiteButton
              title={I18n.t('common.cancel')}
              onPress={onPressClose}
            />
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Heading title={I18n.t('modalDeleteAcount.title')} />
        <Space size={24} />
        <AppText size='m'>{I18n.t('modalDeleteAcount.text')}</AppText>
        <Space size={8} />
        <CheckTextInput
          isPassword
          value={password}
          onChangeText={onChangeText}
          onBlur={onBlur}
          maxLength={20}
          placeholder='Password'
          autoCapitalize='none'
          autoCorrect={false}
          returnKeyType='done'
          errorMessage={errorMessage}
        />
        <Space size={32} />
        <View style={styles.button}>
          <SubmitButton
            isLoading={isLoading}
            title={I18n.t('modalDeleteAcount.button')}
            onPress={onPressDelete2}
          />
          <Space size={16} />
          <WhiteButton title={I18n.t('common.cancel')} onPress={onPressClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
  },
  button: {
    paddingHorizontal: horizontalScale(16),
  },
});

export default ModalDeleteAcount;
