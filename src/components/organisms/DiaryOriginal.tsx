import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontSizeS, subTextColor } from '../../styles/Common';
import { getAlgoliaDate } from '../../utils/time';
import { Diary, User, Word } from '../../types';
import I18n from '../../utils/I18n';
import { DiaryTitleAndText, MyDiaryStatus } from '../molecules';

interface Props {
  diary: Diary;
  user: User;
  title: string;
  text: string;
  words: Word[];
  activeId: number | null;
  setActiveId: (activeId: number | null) => void;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
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
  textLength: {
    color: subTextColor,
    fontSize: fontSizeS,
    textAlign: 'right',
  },
});

const DiaryOriginal: React.FC<Props> = ({
  diary,
  user,
  title,
  text,
  words,
  activeId,
  setActiveId,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.postDayText}>
          {getAlgoliaDate(diary.createdAt)}
        </Text>
        <MyDiaryStatus diaryStatus={diary.diaryStatus} />
      </View>
      <DiaryTitleAndText
        themeCategory={diary.themeCategory}
        themeSubcategory={diary.themeSubcategory}
        textLanguage={user.learnLanguage}
        title={title}
        words={words}
        activeId={activeId}
        setActiveId={setActiveId}
      />
      <Text style={styles.textLength}>
        {I18n.t('postDiaryComponent.textLength')}
        {` ${text.length}`}
      </Text>
    </View>
  );
};

export default React.memo(DiaryOriginal);
