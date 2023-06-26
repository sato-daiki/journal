import React, { ReactNode } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, StyleSheet, View } from 'react-native';

import { Hoverable } from '@/components/atoms';

import {
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
} from '@/styles/Common';

interface Props {
  isBorrderTop?: boolean;
  title: string;
  leftIcon?: ReactNode;
  righComponent?: ReactNode;
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
    paddingRight: 6,
    borderBottomColor: borderLightColor,
    borderTopColor: borderLightColor,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    width: 22,
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

const OptionItem = ({
  isBorrderTop = false,
  title,
  leftIcon,
  righComponent,
  onPress,
}: Props) => {
  const borderTopWidth = isBorrderTop ? 0.5 : undefined;
  return (
    <Hoverable style={[styles.container, { borderTopWidth }]} onPress={onPress}>
      <View style={styles.leftContainer}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.rightContainer}>
        {righComponent}
        {onPress && (
          <MaterialCommunityIcons
            size={28}
            color={subTextColor}
            name='chevron-right'
          />
        )}
      </View>
    </Hoverable>
  );
};

export default OptionItem;
