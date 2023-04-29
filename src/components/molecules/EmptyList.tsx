import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { subTextColor, fontSizeS } from '../../styles/Common';
import { Space } from '../atoms';

type Props = {
  message: string;
  iconName: any;
  paddingTop?: number;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emptyUpper: {
    flex: 1,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: fontSizeS,
    lineHeight: fontSizeS * 1.6,
    color: subTextColor,
    textAlign: 'center',
  },
});

const EmptyList: React.FC<Props> = ({
  message,
  iconName,
  paddingTop = 64,
}: Props) => {
  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.emptyUpper}>
        <MaterialCommunityIcons
          name={iconName}
          size={50}
          color={subTextColor}
        />
        <Space size={8} />
        <Text style={styles.emptyText}>{message}</Text>
      </View>
    </View>
  );
};

export default EmptyList;
