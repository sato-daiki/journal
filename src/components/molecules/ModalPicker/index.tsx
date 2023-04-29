import React, { useCallback, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import PModal from './PModal';
import { HoverableIcon } from '@/components/atoms';
import {
  fontSizeM,
  offWhite,
  primaryColor,
  subTextColor,
} from '@/styles/Common';

export type PickerItem = {
  value: string;
  label: string;
};

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  selectedItem: PickerItem | undefined;
  items: PickerItem[];
  onPressItem: (item: PickerItem) => void;
};

const ModalPicker: React.FC<Props> = ({
  containerStyle,
  selectedItem,
  items,
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
          selectedItem ? styles.active : styles.inactive,
          containerStyle,
        ]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.text,
            { color: selectedItem ? primaryColor : subTextColor },
          ]}
        >
          {selectedItem ? selectedItem.label : 'タップして選択'}
        </Text>
        <HoverableIcon
          icon='community'
          name={'chevron-right'}
          size={32}
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
  },
  text: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: fontSizeM,
    color: primaryColor,
    flex: 1,
  },
  active: {
    backgroundColor: '#fff',
    borderColor: primaryColor,
  },
  inactive: {
    backgroundColor: offWhite,
    borderColor: primaryColor,
  },
});

export default React.memo(ModalPicker);
