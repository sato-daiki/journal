import React, { useCallback, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { CountryNameWithFlag, HoverableIcon } from '@/components/atoms';
import { primaryColor } from '@/styles/Common';
import { LongCode } from '@/types';
import PModal from './ModalPicker/PModal';
import { PickerItem, Size } from './ModalPicker';

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
        <HoverableIcon
          icon='community'
          name={size === 'large' ? 'chevron-right' : 'chevron-down'}
          size={size === 'large' ? 32 : 16}
          color={primaryColor}
        />
      </TouchableOpacity>
      <PModal
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
    backgroundColor: '#fff',
    borderColor: primaryColor,
  },
});

export default React.memo(LanguageModalPicker);
