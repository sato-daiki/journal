import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSizeM, subTextColor, hoverMain } from '../../styles/Common';
import Hoverable from './Hoverable';

import I18n from '../../utils/I18n';

interface Props {
  onPress?: () => void;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hover: {
    borderRadius: 16,
    backgroundColor: hoverMain,
  },
  text: {
    color: subTextColor,
    fontSize: fontSizeM,
    marginLeft: 2,
  },
});

const AddButton: React.FC<Props> = ({ onPress }: Props) => {
  return (
    <View style={styles.container}>
      <Hoverable style={styles.row} onPress={onPress} hoverStyle={styles.hover}>
        <MaterialCommunityIcons size={24} color={subTextColor} name='plus' />
        <Text style={styles.text}>{I18n.t('selectLanguage.add')}</Text>
      </Hoverable>
    </View>
  );
};

export default React.memo(AddButton);
