import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { languageToolLanguages } from '@/utils/grammarCheck';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ModalPicker, { PickerItem, Size } from './ModalPicker';
import { useAppTheme } from '@/styles/colors';
import CountryNameWithFlag from './CountryNameWithFlag';
import { LongCode } from '@/types';

export interface Props {
  size?: Size;
  selectedItem: PickerItem;
  onPressItem: (item: PickerItem) => void;
}

const LanguageModalPicker: React.FC<Props> = ({
  size = 'large',
  selectedItem,
  onPressItem,
}) => {
  const theme = useAppTheme();
  const [isVisible, setIsVisible] = useState(false);

  const onPress = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handlePressItem = useCallback(
    (item: PickerItem) => {
      setIsVisible(false);
      onPressItem(item);
    },
    [onPressItem],
  );

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
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.innerContainer,
          {
            borderColor: theme.colors.primary,
          },
          size === 'large'
            ? {
                flex: 1,
                paddingLeft: 16,
              }
            : {
                width: 136,
                paddingLeft: 6,
              },
        ]}
        onPress={onPress}
      >
        <CountryNameWithFlag
          size={size}
          longCode={selectedItem.value as LongCode}
        />
        <MaterialCommunityIcons
          color={theme.colors.primary}
          name={size === 'large' ? 'chevron-right' : 'chevron-down'}
          size={size === 'large' ? 32 : 16}
        />
      </TouchableOpacity>
      <ModalPicker
        isVisible={isVisible}
        items={options}
        onPressItem={handlePressItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  innerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default LanguageModalPicker;
