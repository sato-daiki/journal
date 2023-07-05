import React, { useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import PItem from './PItem';
import Modal from '@/components/templates/Modal';

export type PickerItem = {
  value: string;
  label: string;
};

export type Size = 'large' | 'small';

type Props = {
  isVisible: boolean;
  items: PickerItem[];
  onPressItem: (item: PickerItem) => void;
};

const ModalPicker: React.FC<Props> = ({ isVisible, items, onPressItem }) => {
  const renderItem: ListRenderItem<PickerItem> = useCallback(
    ({ item }) => {
      return <PItem item={item} onPressItem={onPressItem} />;
    },
    [onPressItem],
  );

  return (
    <Modal visible={isVisible}>
      <FlatList
        // スクロールバーを固定で出すフラグ。androidのみ
        persistentScrollbar
        keyExtractor={(_item, index) => String(index)}
        data={items}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </Modal>
  );
};

export default ModalPicker;
