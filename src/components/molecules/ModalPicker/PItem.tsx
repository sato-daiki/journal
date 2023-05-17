import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderLightColor, fontSizeM } from '@/styles/Common';
import { PickerItem } from '.';

type Props = {
  item: PickerItem;
  onPressItem: (item: PickerItem) => void;
};

const PItem: React.FC<Props> = ({ item, onPressItem }) => {
  const onPress = useCallback(() => {
    onPressItem(item);
  }, [item, onPressItem]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.label}>{item.label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: borderLightColor,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: fontSizeM,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});

export default React.memo(PItem);
