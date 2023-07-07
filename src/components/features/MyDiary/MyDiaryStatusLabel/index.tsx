import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Diary } from '../../../../types';
import { getMyDiaryStatus } from '@/utils/diary';
import DiaryStatusLabel from './DiaryStatusLabel';
import { useAppTheme } from '@/styles/colors';

interface Props {
  diary: Diary;
}

const MyDiaryStatusLabel: React.FC<Props> = ({ diary }) => {
  const theme = useAppTheme();
  const status = useMemo(() => {
    return getMyDiaryStatus(diary);
  }, [diary]);

  if (status) {
    return (
      <>
        <View style={styles.padding} />
        <DiaryStatusLabel
          color={status.color || theme.colors.primary}
          text={status.text}
        />
      </>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  padding: {
    paddingLeft: 8,
  },
});

export default MyDiaryStatusLabel;
