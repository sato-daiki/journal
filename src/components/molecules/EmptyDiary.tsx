import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSizeM, subTextColor } from '../../styles/Common';
import I18n from '../../utils/I18n';

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    alignItems: 'center',
  },
  text: {
    color: subTextColor,
    fontSize: fontSizeM,
    paddingBottom: 32,
  },
});

const EmptyDiary = () => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name='book-open-variant' size={50} color={subTextColor} />
      <Text style={styles.text}>{I18n.t('emptyDiary.empty')}</Text>
    </View>
  );
};

export default EmptyDiary;
