import React from 'react';
import { Text, StyleSheet, View, Platform } from 'react-native';
import I18n from '../../utils/I18n';

interface Props {
  color: string;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 11,
    textAlign: 'center',
    justifyContent: 'center',
    padding: Platform.OS === 'ios' ? 2 : 0,
  },
});

const TabLabel = ({ color }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color }]}>{I18n.t('mainTab.teachDiary')}</Text>
    </View>
  );
};

export default TabLabel;
