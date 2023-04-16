import React, { useCallback } from 'react';
import { Text, StyleSheet } from 'react-native';
import { fontSizeM, primaryColor, borderLightColor } from '../../styles/Common';
import { Checkbox, Hoverable } from '../atoms';

interface Props {
  checked: boolean;
  disable?: boolean;
  day: number;
  title: string;
  onPress: (day: number) => void;
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
    paddingRight: 14,
    borderBottomColor: borderLightColor,
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeM,
  },
  opacity: {
    opacity: 0.4,
  },
});

const CheckItem = ({ title, day, checked, disable, onPress }: Props) => {
  const onPressItem = useCallback(() => {
    onPress(day);
  }, [day, onPress]);

  return (
    <Hoverable
      onPress={onPressItem}
      style={[styles.container, disable ? styles.opacity : undefined]}
    >
      <Text style={styles.title}>{title}</Text>
      <Checkbox checked={checked} disable={disable} />
    </Hoverable>
  );
};

export default React.memo(CheckItem);
