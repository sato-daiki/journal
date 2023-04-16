import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSizeM, subTextColor, imageLightColor } from '../../styles/Common';

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
  icon: {
    paddingBottom: 8,
  },
});

const EmptyFavoriteUser = () => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        size={70}
        style={styles.icon}
        color={imageLightColor}
        name='heart-outline'
      />
      <Text style={styles.text}>お気に入りユーザがいません。ユーザを追加してみよう。</Text>
    </View>
  );
};

export default EmptyFavoriteUser;
