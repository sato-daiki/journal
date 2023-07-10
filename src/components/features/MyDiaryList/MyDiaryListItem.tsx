import React, { useCallback } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Diary } from '@/types';
import { fontSizeM } from '@/styles/fonts';
import I18n from '@/utils/I18n';
import DiaryListItem from '@/components/features/MyDiaryList/DiaryListItem';
import { softRed, useAppTheme, white } from '@/styles/colors';
import { horizontalScale, moderateScale } from '@/styles/metrics';

interface Props {
  index: number;
  item: Diary;
  elRefs: React.MutableRefObject<Swipeable[]>;
  handlePressItem: (item: Diary) => void;
  handlePressDelete: (item: Diary, index: number) => void;
}

const MyDiaryListItem = ({
  index,
  item,
  elRefs,
  handlePressItem,
  handlePressDelete,
}: Props) => {
  const theme = useAppTheme();

  const onPressItem = useCallback(() => {
    handlePressItem(item);
  }, [handlePressItem, item]);

  const onPressDelete = useCallback(() => {
    handlePressDelete(item, index);
  }, [handlePressDelete, index, item]);

  const renderRightActions = useCallback(
    (_progress: any, dragX: any) => {
      const trans = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });
      return (
        <View style={[styles.rightAction, { backgroundColor: softRed }]}>
          <TouchableOpacity style={styles.deleteButton} onPress={onPressDelete}>
            <Animated.Text
              style={[
                styles.deleteText,
                {
                  color: white,
                  transform: [{ translateX: trans }],
                },
              ]}
            >
              {I18n.t('common.delete')}
            </Animated.Text>
          </TouchableOpacity>
        </View>
      );
    },
    [onPressDelete],
  );

  const setRef = useCallback(
    (el) => {
      // eslint-disable-next-line no-param-reassign
      elRefs.current[index] = el;
    },
    [elRefs, index],
  );

  return (
    <Swipeable ref={setRef} renderRightActions={renderRightActions}>
      <DiaryListItem item={item} onPressItem={onPressItem} />
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  rightAction: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  deleteButton: {
    flex: 1,
    justifyContent: 'center',
  },
  deleteText: {
    fontSize: fontSizeM,
    paddingHorizontal: horizontalScale(32),
    fontWeight: 'bold',
  },
});

export default React.memo(MyDiaryListItem);
