import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSizeM, primaryColor } from '../../styles/Common';
import I18n from '../../utils/I18n';
import { twitterShare, facebookShare } from '../../utils/common';
import { Language } from '../../types';
import { Hoverable } from '../atoms';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeM,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    borderRadius: 24,
    borderColor: primaryColor,
    borderWidth: 3,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
});

const Sns: React.FC<Props> = () => {
  const onPressFacebook = (): void => {
    facebookShare();
  };

  const onPressTwitter = (): void => {
    twitterShare();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{I18n.t('sns.app')}</Text>
      <View style={styles.row}>
        <Hoverable style={styles.icon} onPress={onPressFacebook}>
          <MaterialCommunityIcons
            size={28}
            color={primaryColor}
            name='facebook'
          />
        </Hoverable>
        <Hoverable style={styles.icon} onPress={onPressTwitter}>
          <MaterialCommunityIcons
            size={24}
            color={primaryColor}
            name='twitter'
          />
        </Hoverable>
      </View>
    </View>
  );
};

export default Sns;
