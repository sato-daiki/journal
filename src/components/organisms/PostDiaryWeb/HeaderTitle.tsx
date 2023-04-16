import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { fontSizeL } from '@/styles/Common';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  logo: {
    fontSize: fontSizeL,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const HeaderTitle: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Interchao</Text>
    </View>
  );
};

export default React.memo(HeaderTitle);
