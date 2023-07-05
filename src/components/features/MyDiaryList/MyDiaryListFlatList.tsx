import React, { useCallback, useMemo } from 'react';
import {
  StyleSheet,
  FlatList,
  RefreshControl,
  ListRenderItem,
} from 'react-native';
import { Diary } from '@/types';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import I18n from '@/utils/I18n';

import EmptyMyDiaryList from './EmptyMyDiaryList';
import MyDiaryListItem from './MyDiaryListItem';
import { GrayHeader } from '@/components/molecules';

interface Props {
  elRefs: React.MutableRefObject<Swipeable[]>;
  isEmpty: boolean;
  refreshing: boolean;
  diaryTotalNum: number;
  diaries: Diary[];
  loadNextPage: () => void;
  onRefresh: () => void;
  handlePressItem: (item: Diary) => void;
  handlePressDelete: (item: Diary, index: number) => void;
}

const keyExtractor = (item: Diary, index: number): string => String(index);

const MyDiaryListFlatList: React.FC<Props> = ({
  elRefs,
  isEmpty,
  refreshing,
  diaryTotalNum,
  diaries,
  loadNextPage,
  handlePressItem,
  onRefresh,
  handlePressDelete,
}) => {
  const ListEmptyComponent = useCallback(() => {
    if (isEmpty) {
      return <EmptyMyDiaryList />;
    }
    return null;
  }, [isEmpty]);

  const listHeaderComponent = useCallback(() => {
    return (
      <GrayHeader
        title={I18n.t('myDiaryList.diaryList', { count: diaryTotalNum })}
      />
    );
  }, [diaryTotalNum]);

  const renderItem: ListRenderItem<Diary> = useCallback(
    ({ item, index }) => {
      return (
        <MyDiaryListItem
          index={index}
          item={item}
          elRefs={elRefs}
          handlePressItem={handlePressItem}
          handlePressDelete={handlePressDelete}
        />
      );
    },
    [elRefs, handlePressDelete, handlePressItem],
  );

  const refreshControl = useMemo(() => {
    return <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />;
  }, [onRefresh, refreshing]);

  return (
    <FlatList
      // emptyの時のレイアウトのため
      contentContainerStyle={isEmpty ? styles.flatList : null}
      data={diaries}
      keyExtractor={keyExtractor}
      refreshing={refreshing}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={listHeaderComponent}
      onEndReached={loadNextPage}
      refreshControl={refreshControl}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
});

export default React.memo(MyDiaryListFlatList);
