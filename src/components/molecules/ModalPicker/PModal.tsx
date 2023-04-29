import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import PItem from './PItem';
import { PickerItem } from './';

type Props = {
  isVisible: boolean;
  items: PickerItem[];
  onPressItem: (item: PickerItem) => void;
};

const PModal: React.FC<Props> = ({ isVisible, items, onPressItem }) => {
  const renderItem: ListRenderItem<PickerItem> = useCallback(
    ({ item }) => {
      return <PItem item={item} onPressItem={onPressItem} />;
    },
    [onPressItem],
  );

  return (
    <Modal isVisible={isVisible} backdropColor='black' style={styles.modal}>
      <View style={styles.innerContainer}>
        <FlatList
          // スクロールバーを固定で出すフラグ。androidのみ
          persistentScrollbar
          keyExtractor={(_item, index) => String(index)}
          data={items}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    padding: 10,
  },
  innerContainer: {
    maxHeight: 480,
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderRadius: 10,
  },
});

export default PModal;
