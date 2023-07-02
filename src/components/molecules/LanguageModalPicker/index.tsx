import React, { useCallback, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { LongCode } from '@/types';
import ModalPicker, { PickerItem, Size } from '../ModalPicker';
import CountryNameWithFlag from '../CountryNameWithFlag';
import { Icon } from '@/components/atoms';
import { useAppTheme } from '@/styles/colors';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  selectedItem: PickerItem;
  items: PickerItem[];
  size?: Size;
  onPressItem: (item: PickerItem) => void;
};

const LanguageModalPicker: React.FC<Props> = ({
  containerStyle,
  selectedItem,
  items,
  size = 'large',
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

  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
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
          containerStyle,
        ]}
        onPress={onPress}
      >
        <CountryNameWithFlag
          size={size}
          longCode={selectedItem.value as LongCode}
        />
        <Icon
          icon='community'
          name={size === 'large' ? 'chevron-right' : 'chevron-down'}
          size={size === 'large' ? 32 : 16}
        />
      </TouchableOpacity>
      <ModalPicker
        isVisible={isVisible}
        items={items}
        onPressItem={handlePressItem}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default React.memo(LanguageModalPicker);
