import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, RefreshControl, ScrollView } from 'react-native';
import * as Localization from 'expo-localization';

import { Diary } from '@/types';
import { Calendar } from '@/components/molecules';
import { getDay } from '@/utils/time';
import { getMarkedDates, MY_STATUS } from '@/utils/diary';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import I18n from '@/utils/I18n';
import MyDiaryListItem from './MyDiaryListItem';
import { AppText, Icon } from '@/components/atoms';
import { useAppTheme } from '@/styles/colors';
import { fontSizeM } from '@/styles/Common';

export interface Dot {
  id: string;
  color?: string;
}

export interface MarkedDates {
  [date: string]: {
    dots?: Dot[];
    selected: boolean;
  };
}

interface Props {
  elRefs: React.MutableRefObject<Swipeable[]>;
  refreshing: boolean;
  diaries: Diary[];
  loadNextPage: () => void;
  onRefresh: () => void;
  handlePressItem: (item: Diary) => void;
  handlePressDelete: (item: Diary, index: number) => void;
}

const custumTheme = {
  textDayFontWeight: '400',
  textDayHeaderFontWeight: '400',
};

const status = [
  { id: 1, color: MY_STATUS.draft.color, text: MY_STATUS.draft.text },
  { id: 2, color: MY_STATUS.checked.color, text: MY_STATUS.checked.text },
  { id: 3, color: MY_STATUS.revised.color, text: MY_STATUS.revised.text },
];

const code = Localization.locale.split('-')[0];

const MyDiaryListCalendar: React.FC<Props> = ({
  elRefs,
  refreshing,
  diaries,
  onRefresh,
  handlePressItem,
  handlePressDelete,
}) => {
  const theme = useAppTheme();

  const [selectedDay, setSelectedDay] = useState<string | null>(
    getDay(new Date(), 'YYYY-MM-DD'),
  );
  const [targetDayDiaries, setTargetDayDiaries] = useState<Diary[]>([]);

  const markedDates = useMemo(() => {
    const newMarkedDates = getMarkedDates(diaries);
    if (selectedDay) {
      return {
        ...newMarkedDates,
        [selectedDay]: {
          ...newMarkedDates[selectedDay],
          selected: true,
        },
      };
    }
    return {
      ...newMarkedDates,
    };
  }, [diaries, selectedDay]);

  useEffect(() => {
    const newDiaries = diaries.filter(
      (item) =>
        getDay(
          item.publishedAt
            ? item.publishedAt.toDate()
            : item.createdAt.toDate(),
          'YYYY-MM-DD',
        ) === selectedDay,
    );
    setTargetDayDiaries(newDiaries);
  }, [diaries, selectedDay]);

  const onDayPress = useCallback(
    (date) => {
      setSelectedDay(date.dateString);
    },
    [setSelectedDay],
  );

  const renderHeader = useCallback(
    (date) => (
      <AppText size='l'>
        {date.toString(code === 'ja' ? 'yyyy年M月' : 'MM yyyy')}
      </AppText>
    ),
    [],
  );

  const renderArrow = useCallback(
    (direction: 'left' | 'right') => {
      return (
        <Icon
          icon='community'
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
          size={32}
          color={theme.colors.main}
        />
      );
    },
    [theme.colors.main],
  );

  const refreshControl = useMemo(() => {
    return <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />;
  }, [onRefresh, refreshing]);

  const renderTargetDayDiaries = useMemo(() => {
    return targetDayDiaries.map((item, index) => (
      <MyDiaryListItem
        key={item.objectID}
        index={index}
        item={item}
        elRefs={elRefs}
        handlePressItem={handlePressItem}
        handlePressDelete={handlePressDelete}
      />
    ));
  }, [elRefs, handlePressDelete, handlePressItem, targetDayDiaries]);

  return (
    <ScrollView style={styles.container} refreshControl={refreshControl}>
      <View style={styles.statusContainer}>
        {useMemo(
          () =>
            status.map((s) => (
              <View key={s.id} style={styles.row}>
                <View style={[styles.dot, { backgroundColor: s.color }]} />
                <AppText size='s'>{s.text}</AppText>
              </View>
            )),
          [],
        )}
      </View>
      <Calendar
        //@ts-ignore
        markedDates={markedDates}
        markingType='multi-dot'
        onDayPress={onDayPress}
        renderArrow={renderArrow}
        renderHeader={renderHeader}
        //@ts-ignore
        theme={{
          todayTextColor: theme.colors.main,
          selectedDayBackgroundColor: theme.colors.main,
          dayTextColor: theme.colors.primary,
          textDayFontSize: fontSizeM,
          ...custumTheme,
        }}
      />
      {targetDayDiaries.length > 0 ? (
        renderTargetDayDiaries
      ) : (
        <View style={styles.emptyContainer}>
          <AppText size='m' color={theme.colors.secondary}>
            {I18n.t('myDiaryList.emptyDiary')}
          </AppText>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusContainer: {
    marginTop: 16,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
});

export default React.memo(MyDiaryListCalendar);
