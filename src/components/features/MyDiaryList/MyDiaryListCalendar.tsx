import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, RefreshControl, ScrollView } from 'react-native';
import * as Localization from 'expo-localization';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Diary } from '@/types';
import { Calendar } from '@/components/molecules';
import { getDay } from '@/utils/time';
import { getMarkedDates } from '@/utils/diary';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import I18n from '@/utils/I18n';
import MyDiaryListItem from './MyDiaryListItem';
import { AppText } from '@/components/atoms';
import { myStatusColor, useAppTheme } from '@/styles/colors';
import { fontSizeM } from '@/styles/fonts';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

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
  textDayFontWeight: '400' as '400',
  textDayHeaderFontWeight: '400' as '400',
  textDayFontSize: moderateScale(fontSizeM),
};

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
  const status = useMemo(
    () => [
      {
        id: 1,
        color: myStatusColor.draft,
        text: I18n.t('myDiaryStatus.draft'),
      },
      {
        id: 2,
        color: theme.colors.primary,
        text: I18n.t('myDiaryStatus.checked'),
      },
      {
        id: 3,
        color: myStatusColor.revised,
        text: I18n.t('myDiaryStatus.revised'),
      },
    ],
    [theme.colors.primary],
  );

  const [selectedDay, setSelectedDay] = useState<string | null>(
    getDay(new Date(), 'YYYY-MM-DD'),
  );

  const markedDates = useMemo(() => {
    const newMarkedDates = getMarkedDates(diaries, theme.colors.primary);
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
  }, [diaries, selectedDay, theme.colors.primary]);

  const targetDayDiaries = useMemo(
    () =>
      diaries.filter(
        (item) =>
          getDay(
            item.publishedAt
              ? item.publishedAt.toDate()
              : item.createdAt.toDate(),
            'YYYY-MM-DD',
          ) === selectedDay,
      ),
    [diaries, selectedDay],
  );

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
        <MaterialCommunityIcons
          size={moderateScale(32)}
          color={theme.colors.primary}
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
        />
      );
    },
    [theme.colors.primary],
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

  const [show, setShow] = useState(true);

  useEffect(() => {
    // ダークテーマに変えた時にカレンダーを強制レンダーをするため
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 100);
  }, [theme.colors.background]);

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
          [status],
        )}
      </View>

      {show && (
        <Calendar
          markedDates={markedDates}
          markingType='multi-dot'
          onDayPress={onDayPress}
          renderArrow={renderArrow}
          renderHeader={renderHeader}
          theme={{
            ...custumTheme,
            todayTextColor: theme.colors.main,
            selectedDayBackgroundColor: theme.colors.main,
            dayTextColor: theme.colors.primary,
            calendarBackground: theme.colors.background,
          }}
        />
      )}
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
    marginTop: verticalScale(16),
    paddingHorizontal: horizontalScale(8),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: horizontalScale(8),
  },
  dot: {
    width: horizontalScale(8),
    height: verticalScale(8),
    borderRadius: moderateScale(4),
    marginRight: horizontalScale(4),
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(32),
  },
});

export default React.memo(MyDiaryListCalendar);
