import React from 'react';
import { Text, StyleSheet, View, Switch } from 'react-native';

import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  mainColor,
} from '@/styles/Common';

interface Props {
  isBorrderTop?: boolean;
  title: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    backgroundColor: '#fff',
    height: 48,
    paddingLeft: 16,
    paddingRight: 6,
    borderBottomColor: borderLightColor,
    borderTopColor: borderLightColor,
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeM,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const OptionSwitch = ({
  isBorrderTop = false,
  title,
  value,
  onValueChange,
}: Props) => {
  const borderTopWidth = isBorrderTop ? 0.5 : undefined;

  return (
    <View style={[styles.container, { borderTopWidth }]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightContainer}>
        <Switch
          trackColor={{ true: mainColor }}
          onValueChange={onValueChange}
          value={value}
        />
      </View>
    </View>
  );
};

export default OptionSwitch;