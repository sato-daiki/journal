import React, { useCallback, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { AppText, Icon } from '@/components/atoms';
import ModalPicker, { PickerItem } from '../../molecules/ModalPicker';

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
        <AppText size='l' bold={hasRevised}>
          {selectedItem.label}
        </AppText>
        {hasRevised && (
          <Icon icon='community' name={'chevron-down'} size={32} />
        )}
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
  },
});

export default React.memo(MyDiaryModalPicker);
