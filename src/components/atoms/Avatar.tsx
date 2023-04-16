import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { imageLightColor, subTextColor } from '../../styles/Common';
import Hoverable from './Hoverable';

const styles = StyleSheet.create({
  container: {},
  icon: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  avatarContainer: {
    backgroundColor: imageLightColor,
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dummyAvatarIcon: {
    color: '#fff',
    backgroundColor: 'transparent',
  },
});

interface Props {
  photoUrl: string | null;
  pickImage: () => void;
}

const Avatar = ({ photoUrl = '', pickImage }: Props) => (
  <Hoverable onPress={pickImage} style={styles.container}>
    {photoUrl ? (
      <Image style={styles.icon} source={{ uri: photoUrl }} />
    ) : (
      <View style={styles.avatarContainer}>
        <MaterialIcons
          name='person'
          size={80}
          style={styles.dummyAvatarIcon}
          color={subTextColor}
        />
      </View>
    )}
  </Hoverable>
);

export default React.memo(Avatar);
