import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { Diary } from '../../types';
import { CountryNameWithFlag, Space } from '../atoms';
import firestore from '@react-native-firebase/firestore';
import { fontSizeS, subTextColor } from '@/styles/Common';
import Matches from '../molecules/Matches';
import { DiaryTitleAndText, MyDiaryStatus } from '../molecules';
import I18n from '../../utils/I18n';
import { getAlgoliaDate } from '@/utils/time';

export interface Props {
  diary: Diary;
  editDiary: (objectID: string, diary: Diary) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewShot: {
    paddingTop: 12,
    backgroundColor: '#fff',
  },
  mainContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  scrollView: {
    flex: 1,
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

/**
 * 日記詳細
 */
const Posted: React.FC<Props> = ({ diary, editDiary }) => {
  const viewShotRef = useRef<ViewShot | null>(null);
  const [textActiveIndex, setTextActiveIndex] = useState<number | null>(null);
  const [titleActiveIndex, setTitleActiveIndex] = useState<number | null>(null);

  const postDayText = useMemo(() => {
    return getAlgoliaDate(diary.createdAt);
  }, [diary.createdAt]);

  const titleActiveLeft = useMemo(() => {
    if (titleActiveIndex !== null && titleActiveIndex !== 0) {
      return true;
    }
    return false;
  }, [titleActiveIndex]);

  const titleActiveRight = useMemo(() => {
    if (
      (diary.titleMatches &&
        diary.titleMatches.length > 0 &&
        titleActiveIndex !== null &&
        titleActiveIndex !== diary.titleMatches.length - 1) ||
      (!!diary.textMatches && diary.textMatches.length > 0)
    ) {
      return true;
    }
    return false;
  }, [diary.textMatches, diary.titleMatches, titleActiveIndex]);

  const textActiveLeft = useMemo(() => {
    if (
      (textActiveIndex !== null && textActiveIndex !== 0) ||
      (!!diary.titleMatches && diary.titleMatches.length > 0)
    ) {
      return true;
    }
    return false;
  }, [diary.titleMatches, textActiveIndex]);

  const textActiveRight = useMemo(() => {
    if (
      textActiveIndex !== null &&
      diary.textMatches &&
      textActiveIndex < diary.textMatches.length - 1
    ) {
      return true;
    }
    return false;
  }, [diary.textMatches, textActiveIndex]);

  const onPressIgnoreTitle = useCallback(async () => {
    if (
      titleActiveIndex !== null &&
      diary.titleMatches &&
      diary.titleMatches.length > 0 &&
      diary.objectID
    ) {
      const newMatches = diary.titleMatches.filter(
        (_, i) => i !== titleActiveIndex,
      );

      await firestore().doc(`diaries/${diary.objectID}`).update({
        titleMatches: newMatches,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

      if (titleActiveIndex >= newMatches.length) {
        setTitleActiveIndex(null);
      }

      editDiary(diary.objectID, {
        ...diary,
        titleMatches: newMatches,
      });
    }
  }, [titleActiveIndex, diary, editDiary]);

  const onPressIgnoreText = useCallback(async () => {
    if (
      textActiveIndex !== null &&
      diary.textMatches &&
      diary.textMatches.length > 0 &&
      diary.objectID
    ) {
      const newMatches = diary.textMatches.filter(
        (_, i) => i !== textActiveIndex,
      );

      await firestore().doc(`diaries/${diary.objectID}`).update({
        textMatches: newMatches,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

      if (textActiveIndex >= newMatches.length) {
        setTextActiveIndex(null);
      }

      editDiary(diary.objectID, {
        ...diary,
        textMatches: newMatches,
      });
    }
  }, [textActiveIndex, diary, editDiary, setTextActiveIndex]);

  const onPressLeftTitle = useCallback(() => {
    setTitleActiveIndex(titleActiveIndex! - 1);
  }, [titleActiveIndex]);

  const onPressRightTitle = useCallback(() => {
    if (textActiveRight && titleActiveIndex !== diary.textMatches!.length - 1) {
      setTitleActiveIndex(titleActiveIndex! + 1);
    } else {
      setTitleActiveIndex(null);
      setTextActiveIndex(0);
    }
  }, [diary.textMatches, textActiveRight, titleActiveIndex]);

  const onPressLeftText = useCallback(() => {
    if (textActiveLeft && textActiveIndex !== 0) {
      setTextActiveIndex(textActiveIndex! - 1);
    } else {
      setTextActiveIndex(null);
      setTitleActiveIndex(diary.titleMatches!.length - 1);
    }
  }, [diary.titleMatches, textActiveIndex, textActiveLeft]);

  const onPressRightText = useCallback(() => {
    if (textActiveRight) {
      setTextActiveIndex(textActiveIndex! + 1);
    }
  }, [textActiveIndex, textActiveRight]);

  const onPressClose = useCallback(() => {
    setTitleActiveIndex(null);
    setTextActiveIndex(null);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ViewShot
          style={styles.viewShot}
          ref={viewShotRef}
          options={{ format: 'jpg', quality: 0.9 }}
        >
          <View style={styles.mainContainer}>
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
              title={diary.title}
              text={diary.text}
              titleMatches={diary.titleMatches}
              textMatches={diary.textMatches}
              titleActiveIndex={titleActiveIndex}
              textActiveIndex={textActiveIndex}
              setTitleActiveIndex={setTitleActiveIndex}
              setTextActiveIndex={setTextActiveIndex}
            />
            <Text style={styles.textLength}>
              {I18n.t('postDiaryComponent.textLength')}
              {` ${diary.text.length}`}
            </Text>
          </View>
        </ViewShot>
        <Space size={32} />
      </ScrollView>
      {diary.titleMatches &&
        diary.titleMatches.length > 0 &&
        titleActiveIndex !== null && (
          <Matches
            matches={diary.titleMatches}
            activeIndex={titleActiveIndex}
            activeLeft={titleActiveLeft}
            activeRight={titleActiveRight}
            onPressLeft={onPressLeftTitle}
            onPressRight={onPressRightTitle}
            onPressClose={onPressClose}
            onPressIgnore={onPressIgnoreTitle}
          />
        )}
      {diary.textMatches &&
        diary.textMatches.length > 0 &&
        textActiveIndex !== null && (
          <Matches
            matches={diary.textMatches}
            activeIndex={textActiveIndex}
            activeLeft={textActiveLeft}
            activeRight={textActiveRight}
            onPressLeft={onPressLeftText}
            onPressRight={onPressRightText}
            onPressClose={onPressClose}
            onPressIgnore={onPressIgnoreText}
          />
        )}
    </View>
  );
};

export default Posted;
