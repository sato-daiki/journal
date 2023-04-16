import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSizeS, softRed } from '../../styles/Common';
import I18n from '../../utils/I18n';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 2,
    fontSize: fontSizeS,
    color: softRed,
  },
});

const FirstDiary = () => (
  <View style={styles.container}>
    <MaterialCommunityIcons size={14} color={softRed} name='star' />
    <Text style={styles.text}>{I18n.t('firstDiary.first')}</Text>
  </View>
);

export default React.memo(FirstDiary);
