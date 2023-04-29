import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontSizeS, subTextColor } from '../../styles/Common';
import { getAlgoliaDate } from '../../utils/time';
import { CheckInfo, Diary, User, Word } from '../../types';
import I18n from '../../utils/I18n';
import { DiaryTitleAndText, MyDiaryStatus } from '../molecules';
import { CountryNameWithFlag } from '../atoms';

interface Props {
  diary: Diary;
  user: User;
  title: string;
  text: string;
  checkInfo?: CheckInfo | null;
  activeIndex?: number | null;
  setActiveIndex?: (activeId: number | null) => void;
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
  user,
  title,
  text,
  checkInfo,
  activeIndex,
  setActiveIndex,
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
        textLanguage={user.learnLanguage}
        checkInfo={checkInfo}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <Text style={styles.textLength}>
        {I18n.t('postDiaryComponent.textLength')}
        {` ${text.length}`}
      </Text>
    </View>
  );
};

export default React.memo(DiaryOriginal);
