import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import I18n from '@/utils/I18n';
import { primaryColor, fontSizeM } from '@/styles/Common';
import { Modal } from '@/components/template';
import { WhiteButton, Space, SubmitButton, Heading } from '@/components/atoms';
import { CheckTextInput } from '@/components/molecules';

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

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    fontSize: fontSizeM,
    color: primaryColor,
    paddingBottom: 16,
    textAlign: Platform.OS === 'web' ? 'center' : 'left',
  },
  button: {
    paddingHorizontal: 16,
  },
});

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
          <Text style={styles.text}>{I18n.t('deleteAcount.confirmation')}</Text>
          <Space size={32} />
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
        <Text style={styles.text}>{I18n.t('modalDeleteAcount.text')}</Text>
        <CheckTextInput
          isPassword
          value={password}
          onChangeText={onChangeText}
          onBlur={onBlur}
          maxLength={20}
          placeholder='Password'
          autoCapitalize='none'
          autoCorrect={false}
          underlineColorAndroid='transparent'
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

export default ModalDeleteAcount;
