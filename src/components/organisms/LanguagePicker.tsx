import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { languageToolLanguages } from '@/utils/grammarCheck';
import { PickerItem, Size } from '../molecules/ModalPicker';
import LanguageModalPicker from '../molecules/LanguageModalPicker';

export interface Props {
  size?: Size;
  selectedItem: PickerItem;
  onPressItem: (item: PickerItem) => void;
}

const LanguagePicker: React.FC<Props> = ({
  size = 'large',
  selectedItem,
  onPressItem,
}) => {
  const options: PickerItem[] = useMemo(
    () =>
      languageToolLanguages.map((item) => {
        return {
          label: item.name,
          value: item.longCode,
        };
      }),
    [],
  );

  return (
    <View style={styles.radioBoxWrapper}>
      <LanguageModalPicker
        size={size}
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
