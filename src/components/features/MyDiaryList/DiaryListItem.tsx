import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { getDay } from '@/utils/time';
import { Diary } from '@/types';
import { AppText } from '@/components/atoms';
import DiaryTitleWithPill from '../MyDiary/DiaryTitleWithPill';
import { borderLight, useAppTheme } from '@/styles/colors';
import MyDiaryStatusLabel from '../MyDiary/MyDiaryStatusLabel';
import { horizontalScale, verticalScale } from '@/styles/metrics';

interface Props {
  mine?: boolean;
  item: Diary;
  onPressItem: (item: Diary) => void;
}

const DiaryListItem = ({ item, onPressItem }: Props) => {
  const {
    createdAt,
    title,
    text,
    reviseTitle,
    reviseText,
    themeCategory,
    themeSubcategory,
  } = item;
  const theme = useAppTheme();
  const postDay = useMemo(() => getDay(createdAt.toDate()), [createdAt]);

  const onPressRow = useCallback(() => {
    onPressItem(item);
  }, [item, onPressItem]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPressRow}>
      <View style={styles.header}>
        <AppText size='s' color={theme.colors.secondary}>
          {postDay}
        </AppText>
        <MyDiaryStatusLabel diary={item} />
      </View>
      <DiaryTitleWithPill
        isTail
        themeCategory={themeCategory}
        themeSubcategory={themeSubcategory}
        title={reviseTitle || title}
      />
      <View style={styles.content}>
        <AppText
          size='m'
          textAlign='left'
          style={styles.text}
          ellipsizeMode='tail'
          numberOfLines={3}
        >
          {reviseText || text}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(16),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: verticalScale(4),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    flex: 1,
  },
});
export default React.memo(DiaryListItem);
