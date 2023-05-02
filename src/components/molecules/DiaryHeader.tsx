import React, { useMemo } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { fontSizeS, subTextColor } from '../../styles/Common';
import { CountryNameWithFlag } from '../atoms';
import MyDiaryStatus from './MyDiaryStatus';
import { Diary } from '@/types';
import { getAlgoliaDate } from '@/utils/time';

type Props = {
  diary: Diary;
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 4,
  },
  postDayText: {
    color: subTextColor,
    fontSize: fontSizeS,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryNameWithFlag: {
    paddingRight: 8,
  },
});

const DiaryHeader: React.FC<Props> = ({ diary }) => {
  const postDayText = useMemo(() => {
    return getAlgoliaDate(diary.createdAt);
  }, [diary.createdAt]);

  return (
    <View style={styles.header}>
      <Text style={styles.postDayText}>{postDayText}</Text>
      <View style={styles.right}>
        <CountryNameWithFlag
          containerStyle={styles.countryNameWithFlag}
          size='small'
          longCode={diary.longCode}
        />
        <MyDiaryStatus diaryStatus={diary.diaryStatus} />
      </View>
    </View>
  );
};

export default DiaryHeader;
