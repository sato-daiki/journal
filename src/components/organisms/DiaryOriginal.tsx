import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontSizeS, subTextColor } from '../../styles/Common';
import { getAlgoliaDate } from '../../utils/time';
import { Diary, Match } from '../../types';
import I18n from '../../utils/I18n';
import { DiaryTitleAndText, MyDiaryStatus } from '../molecules';
import { CountryNameWithFlag } from '../atoms';

interface Props {
  diary: Diary;
  title: string;
  text: string;
  titleMatches?: Match[] | [];
  textMatches?: Match[] | [];
  titleActiveIndex?: number | null;
  textActiveIndex?: number | null;
  setTitleActiveIndex?: (activeId: number | null) => void;
  setTextActiveIndex?: (activeId: number | null) => void;
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
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryNameWithFlag: {
    paddingRight: 8,
  },
  textLength: {
    color: subTextColor,
    fontSize: fontSizeS,
    textAlign: 'right',
  },
});

const DiaryOriginal: React.FC<Props> = ({
  diary,
  title,
  text,
  titleMatches,
  textMatches,
  titleActiveIndex,
  textActiveIndex,
  setTitleActiveIndex,
  setTextActiveIndex,
}) => {
  const postDayText = useMemo(() => {
    return getAlgoliaDate(diary.createdAt);
  }, [diary.createdAt]);

  return (
    <View style={styles.container}>
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
      <DiaryTitleAndText
        themeCategory={diary.themeCategory}
        themeSubcategory={diary.themeSubcategory}
        title={title}
        text={text}
        titleMatches={titleMatches}
        textMatches={textMatches}
        titleActiveIndex={titleActiveIndex}
        textActiveIndex={textActiveIndex}
        setTitleActiveIndex={setTitleActiveIndex}
        setTextActiveIndex={setTextActiveIndex}
      />
      <Text style={styles.textLength}>
        {I18n.t('postDiaryComponent.textLength')}
        {` ${text.length}`}
      </Text>
    </View>
  );
};

export default React.memo(DiaryOriginal);
