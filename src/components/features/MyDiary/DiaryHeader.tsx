import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import MyDiaryStatusLabel from './MyDiaryStatusLabel';
import { Diary } from '@/types';
import { getDate } from '@/utils/time';
import CountryNameWithFlag from '../../molecules/CountryNameWithFlag';
import { AppText } from '@/components/atoms';
import { useAppTheme } from '@/styles/colors';
import { horizontalScale, verticalScale } from '@/styles/metrics';

type Props = {
  diary: Diary;
};

const DiaryHeader: React.FC<Props> = ({ diary }) => {
  const theme = useAppTheme();
  const postDayText = useMemo(() => {
    return getDate(diary.createdAt);
  }, [diary.createdAt]);

  return (
    <View style={styles.header}>
      <AppText size='s' color={theme.colors.secondary}>
        {postDayText}
      </AppText>
      <View style={styles.right}>
        <CountryNameWithFlag
          containerStyle={styles.countryNameWithFlag}
          size='small'
          longCode={diary.longCode}
        />
        <MyDiaryStatusLabel diary={diary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: verticalScale(4),
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryNameWithFlag: {
    paddingRight: horizontalScale(8),
  },
});

export default DiaryHeader;
