import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Diary } from '../../types';
import { getMyDiaryStatus } from '../../utils/diary';
import DiaryStatus from '../atoms/DiaryStatus';

interface Props {
  diary: Diary;
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

const MyDiaryStatus: React.FC<Props> = ({ diary }) => {
  const status = getMyDiaryStatus(diary);
  if (status) {
    return (
      <>
        <View style={styles.padding} />
        <DiaryStatus color={status.color} text={status.text} />
      </>
    );
  }
  return null;
};

export default MyDiaryStatus;
