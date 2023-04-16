import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { primaryColor, fontSizeL, borderLightColor, fontSizeM } from '../../styles/Common';
import { Modal } from '../template';
import { SubmitButton, WhiteButton, Space } from '../atoms';
import I18n from '../../utils/I18n';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: fontSizeL,
    color: primaryColor,
    fontWeight: 'bold',
    marginVertical: 6,
    paddingBottom: 16,
    textAlign: 'center',
  },
  line: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
    marginBottom: 24,
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
  isBlocked: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  userName: string;
  onPressSubmit: () => void;
  onPressClose: () => void;
}

const ModalBlock: React.FC<Props> = ({
  visible,
  isBlocked,
  isSuccess,
  isLoading,
  userName,
  onPressSubmit,
  onPressClose,
}: Props) => {
  let title = '';
  if (!isBlocked) {
    title = !isSuccess
      ? I18n.t('modalBlock.blockedQuestion', { userName })
      : I18n.t('modalBlock.unblockedSuccess', { userName });
  } else {
    title = !isSuccess
      ? I18n.t('modalBlock.unblockedQuestion', { userName })
      : I18n.t('modalBlock.blockedSuccess', { userName });
  }

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.line} />
        {!isSuccess ? (
          <>
            <Text style={styles.text}>
              {!isBlocked
                ? I18n.t('modalBlock.blockedMessage')
                : I18n.t('modalBlock.unblockedMessage')}
            </Text>
            <Space size={32} />
            <SubmitButton
              isLoading={isLoading}
              title={
                !isBlocked
                  ? I18n.t('modalBlock.blockedButton')
                  : I18n.t('modalBlock.unblockedButton')
              }
              onPress={onPressSubmit}
            />
            <Space size={16} />
            <WhiteButton title={I18n.t('common.cancel')} onPress={onPressClose} />
          </>
        ) : (
          <>
            <Text style={styles.text}>
              {!isBlocked
                ? I18n.t('modalBlock.blockedEndMessage')
                : I18n.t('modalBlock.unblockedEndMessage')}
            </Text>
            <Space size={32} />
            <WhiteButton title={I18n.t('common.close')} onPress={onPressClose} />
          </>
        )}
      </View>
    </Modal>
  );
};

export default ModalBlock;
