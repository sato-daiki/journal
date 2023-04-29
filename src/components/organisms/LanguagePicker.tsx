import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Language } from '@/types';
import ModalPicker, { PickerItem } from '../molecules/ModalPicker';
import { languages } from '@/utils/spellChecker';

export interface Props {
  learnLanguage: Language;
  setLearnLanguage: (language: Language) => void;
}

const LanguagePicker: React.FC<Props> = ({
  learnLanguage,
  setLearnLanguage,
}) => {
  const [selectedItem, setSelectedItem] = useState<PickerItem>();

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

  const onPressItem = useCallback((item: PickerItem) => {
    setSelectedItem(item);
  }, []);

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
