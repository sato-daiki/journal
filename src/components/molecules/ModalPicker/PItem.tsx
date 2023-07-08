import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { PickerItem } from '.';
import { AppText } from '@/components/atoms';
import { borderLight, useAppTheme } from '@/styles/colors';
import { moderateScale, verticalScale } from '@/styles/metrics';

type Props = {
  item: PickerItem;
  onPressItem: (item: PickerItem) => void;
};

const PItem: React.FC<Props> = ({ item, onPressItem }) => {
  const theme = useAppTheme();

  const onPress = useCallback(() => {
    onPressItem(item);
  }, [item, onPressItem]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <AppText size='m' bold style={styles.label}>
          {item.label}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: moderateScale(1),
    borderBottomColor: borderLight,
  },
  label: {
    paddingVertical: verticalScale(12),
  },
});

export default React.memo(PItem);
