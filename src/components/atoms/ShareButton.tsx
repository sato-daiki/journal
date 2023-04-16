import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSizeM, primaryColor } from '../../styles/Common';
import I18n from '../../utils/I18n';
import Hoverable from './Hoverable';

interface Props {
  onPressShare: () => void;
}

const styles = StyleSheet.create({
  contaner: {
    flexDirection: 'row',
    borderRadius: 22,
    borderColor: primaryColor,
    borderWidth: 3,
    width: '100%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginLeft: 8,
    color: primaryColor,
    fontSize: fontSizeM,
    fontWeight: 'bold',
  },
});

const ShareButton: React.FC<Props> = ({ onPressShare }: Props) => {
  return (
    <Hoverable style={styles.contaner} onPress={onPressShare}>
      <MaterialCommunityIcons size={24} color={primaryColor} name='share-variant' />
      <Text style={styles.title}>{I18n.t('sns.diary')}</Text>
    </Hoverable>
  );
};

export default React.memo(ShareButton);
