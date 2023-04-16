import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { primaryColor, subTextColor, fontSizeS } from '../../styles/Common';
import { getLanguage } from '../../utils/diary';
import { Language } from '../../types';
import I18n from '../../utils/I18n';

interface Props {
  learnLanguage: Language;
}

const styles = StyleSheet.create({
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  label: {
    fontSize: fontSizeS,
    color: subTextColor,
    paddingLeft: 2,
    paddingRight: 16,
  },
  language: {
    fontSize: fontSizeS,
    color: primaryColor,
    marginRight: 8,
  },
});

const ProfileLanguage: React.FC<Props> = ({ learnLanguage }) => {
  return (
    <View style={styles.languageContainer}>
      <MaterialCommunityIcons size={14} color={subTextColor} name='pencil' />
      <Text style={styles.label}>{I18n.t('profileLanguage.learn')}</Text>
      <Text style={styles.language}>{getLanguage(learnLanguage)}</Text>
    </View>
  );
};

export default ProfileLanguage;
