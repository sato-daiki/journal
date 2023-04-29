import React from 'react';
import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import { mainColor, fontSizeM, subTextColor } from '../../styles/Common';
import Hoverable from './Hoverable';

interface Props {
  isBorrderTop?: boolean;
  isBorrderBottom?: boolean;
  isLoading?: boolean;
  disable?: boolean;
  title: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  contaner: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    backgroundColor: '#fff',
    borderBottomColor: subTextColor,
    borderTopColor: subTextColor,
  },
  title: {
    color: mainColor,
    fontSize: fontSizeM,
  },
});

const TextButtun: React.FC<Props> = ({
  isBorrderTop = false,
  isBorrderBottom = false,
  isLoading = false,
  disable = false,
  title,
  onPress,
}: Props) => {
  const borderTopWidth = isBorrderTop ? StyleSheet.hairlineWidth : undefined;
  const borderBottomWidth = isBorrderBottom
    ? StyleSheet.hairlineWidth
    : undefined;

  return (
    <Hoverable
      style={[styles.contaner, { borderTopWidth, borderBottomWidth }]}
      activeOpacity={isLoading || disable ? 1 : 0.2}
      onPress={isLoading || disable ? undefined : onPress}
    >
      {isLoading ? (
        <ActivityIndicator size='small' />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </Hoverable>
  );
};

export default React.memo(TextButtun);
