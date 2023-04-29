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
  righComponent?: ReactNode;
  onPress: () => void;
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

const OptionItem = ({
  isBorrderTop = false,
  title,
  righComponent,
  onPress,
}: Props) => {
  const borderTopWidth = isBorrderTop ? 0.5 : undefined;
  return (
    <Hoverable style={[styles.container, { borderTopWidth }]} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightContainer}>
        {righComponent}
        <MaterialCommunityIcons
          size={28}
          color={subTextColor}
          name='chevron-right'
        />
      </View>
    </Hoverable>
  );
};

export default OptionItem;
