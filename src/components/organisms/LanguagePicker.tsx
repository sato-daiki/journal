import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import ModalPicker, { PickerItem } from '../molecules/ModalPicker';
import { languages } from '@/utils/spellChecker';

export interface Props {
  selectedItem: PickerItem;
  onPressItem: (item: PickerItem) => void;
}

const LanguagePicker: React.FC<Props> = ({ selectedItem, onPressItem }) => {
  const options: PickerItem[] = useMemo(
    () =>
      languages.map((item) => {
        return {
          label: item.name,
          value: item.longCode,
        };
      }),
    [],
  );

  return (
    <View style={styles.radioBoxWrapper}>
      <ModalPicker
        items={options}
        selectedItem={selectedItem}
        onPressItem={onPressItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  radioBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  radioBox: {
    marginRight: 8,
    marginBottom: 8,
  },
});

export default LanguagePicker;
