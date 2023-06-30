import React, { ReactNode } from 'react';
import { Text, StyleSheet, View, Switch } from 'react-native';

import { fontSizeM, primaryColor, borderLightColor } from '@/styles/Common';
import { Hoverable, Icon } from '../atoms';

interface Props {
  isBorrderTop?: boolean;
  title: string;
  leftIcon?: ReactNode;
  value: boolean;
  onPress?: () => void;
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
    paddingRight: 16,
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
});

const OptionCheck = ({
  isBorrderTop = false,
  title,
  leftIcon,
  value,
  onPress,
}: Props) => {
  const borderTopWidth = isBorrderTop ? 0.5 : undefined;

  return (
    <Hoverable style={[styles.container, { borderTopWidth }]} onPress={onPress}>
      <View style={styles.leftContainer}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <Text style={styles.title}>{title}</Text>
      </View>
      {value && (
        <Icon icon='community' name='check' size={26} color={primaryColor} />
      )}
    </Hoverable>
  );
};

export default OptionCheck;
