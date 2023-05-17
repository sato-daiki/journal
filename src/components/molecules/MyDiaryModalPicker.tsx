import React, { useCallback, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Text,
} from 'react-native';
import { HoverableIcon } from '@/components/atoms';
import { fontSizeL, primaryColor } from '@/styles/Common';
import PModal from './ModalPicker/PModal';
import { PickerItem } from './ModalPicker';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  hasRevised: boolean;
  selectedItem: PickerItem;
  items: PickerItem[];
  onPressItem: (item: PickerItem) => void;
};

const MyDiaryModalPicker: React.FC<Props> = ({
  containerStyle,
  hasRevised,
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
        style={[styles.container, containerStyle]}
        onPress={() => hasRevised && onPress()}
      >
        <Text
          style={[styles.text, { fontWeight: hasRevised ? 'bold' : '400' }]}
        >
          {selectedItem.label}
        </Text>
        {hasRevised && (
          <HoverableIcon
            icon='community'
            name={'chevron-down'}
            size={32}
            color={primaryColor}
          />
        )}
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
  },
  text: {
    fontSize: fontSizeL,
    color: primaryColor,
  },
});

export default React.memo(MyDiaryModalPicker);
