import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { DiaryStatus } from '../../types';
import { DiaryStatusLabel } from '../atoms';
import { getMyDiaryStatus } from '@/utils/diary';

interface Props {
  diaryStatus: DiaryStatus;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  padding: {
    paddingLeft: 8,
  },
});

const MyDiaryStatus: React.FC<Props> = ({ diaryStatus }) => {
  const status = useMemo(() => {
    return getMyDiaryStatus(diaryStatus);
  }, [diaryStatus]);

  if (status) {
    return (
      <>
        <View style={styles.padding} />
        <DiaryStatusLabel color={status.color} text={status.text} />
      </>
    );
  }
  return null;
};

export default MyDiaryStatus;
