import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Matche } from '../../types';

export interface Props {
  matche: Matche;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

/**
 * 日記詳細
 */
const Match: React.FC<Props> = ({ matche }) => {
  console.log('matche', matche);
  return <View style={styles.container}></View>;
};

export default Match;
