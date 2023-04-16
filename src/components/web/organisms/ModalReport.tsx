import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  primaryColor,
  fontSizeL,
  borderLightColor,
  fontSizeM,
  green,
} from '../../../styles/Common';
import { Modal } from '../../template';
import { WhiteButton, Space } from '../../atoms';
import I18n from '../../../utils/I18n';

interface Props {
  visible: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  onReportSubmit: (reason: string) => void;
  onReportClose: () => void;
}

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
  subTitle: {
    fontSize: fontSizeM,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingBottom: 12,
    color: primaryColor,
  },
  description: {
    fontSize: fontSizeM,
    paddingHorizontal: 16,
    paddingBottom: 16,
    lineHeight: fontSizeM * 1.3,
    color: primaryColor,
  },
  headerReported: {
    paddingTop: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  center: {
    textAlign: 'center',
  },
});

const ModalReport: React.FC<Props> = ({
  visible,
  isSuccess,
  isLoading,
  onReportSubmit,
  onReportClose,
}: Props) => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {!isSuccess ? (
          <>
            <Text style={styles.title}>{I18n.t('report.title')}</Text>
            <View style={styles.line} />
            <Text style={styles.subTitle}>{I18n.t('report.subTitle')}</Text>
            <Text style={styles.description}>{I18n.t('report.description')}</Text>
            <Space size={32} />
            <WhiteButton
              isLoading={isLoading}
              title={I18n.t('report.spam')}
              onPress={(): void => onReportSubmit('spam')}
            />
            <Space size={16} />
            <WhiteButton
              isLoading={isLoading}
              title={I18n.t('report.inappropriate')}
              onPress={(): void => onReportSubmit('inappropriate')}
            />
          </>
        ) : (
          <>
            <View style={styles.headerReported}>
              <MaterialCommunityIcons size={70} color={green} name='check' />
              <Text style={styles.title}>{I18n.t('report.reportedTitle')}</Text>
            </View>
            <Text style={[styles.description, styles.center]}>
              {I18n.t('report.reportedDescription')}
            </Text>
            <Space size={32} />
            <WhiteButton title={I18n.t('common.close')} onPress={onReportClose} />
          </>
        )}
      </View>
    </Modal>
  );
};

export default ModalReport;
