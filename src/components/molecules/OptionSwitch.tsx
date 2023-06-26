import React, { ReactNode } from 'react';
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
  leftIcon?: ReactNode;
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
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    width: 22,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const OptionSwitch = ({
  isBorrderTop = false,
  title,
  leftIcon,
  value,
  onValueChange,
}: Props) => {
  const borderTopWidth = isBorrderTop ? 0.5 : undefined;

  return (
    <View style={[styles.container, { borderTopWidth }]}>
      <View style={styles.leftContainer}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <Text style={styles.title}>{title}</Text>
      </View>
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
