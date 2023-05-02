import React, { useCallback, useRef } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { Diary } from '../../../types';
import { Space } from '../../atoms';
import firestore from '@react-native-firebase/firestore';
import Matches from './Matches';
import LanguageToolDiaryTitleAndText from './LanguageToolDiaryTitleAndText';
import DiaryHeader from '@/components/molecules/DiaryHeader';
import DiaryFooter from '@/components/molecules/DiaryFooter';
import { useCommon } from './useCommon';

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
});

const LanguageTool: React.FC<Props> = ({ diary, editDiary }) => {
  const viewShotRef = useRef<ViewShot | null>(null);
  const titleArray = diary.languageTool?.titleMatches;
  const textArray = diary.languageTool?.textMatches;

  const {
    titleActiveIndex,
    textActiveIndex,
    setTitleActiveIndex,
    setTextActiveIndex,
    titleActiveLeft,
    titleActiveRight,
    onPressLeftTitle,
    onPressRightTitle,
    onPressClose,
    textActiveLeft,
    textActiveRight,
    onPressLeftText,
    onPressRightText,
  } = useCommon({
    titleArray,
    textArray,
  });

  const onPressIgnoreTitle = useCallback(async () => {
    if (
      titleActiveIndex !== null &&
      titleArray &&
      titleArray.length > 0 &&
      diary.objectID
    ) {
      const newMatches = titleArray.filter((_, i) => i !== titleActiveIndex);

      const languageTool = {
        ...diary.languageTool,
        titleMatches: newMatches,
      };

      await firestore().doc(`diaries/${diary.objectID}`).update({
        languageTool,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

      if (titleActiveIndex >= newMatches.length) {
        setTitleActiveIndex(null);
      }

      editDiary(diary.objectID, {
        ...diary,
        languageTool,
      });
    }
  }, [titleActiveIndex, titleArray, diary, editDiary, setTitleActiveIndex]);

  const onPressIgnoreText = useCallback(async () => {
    if (
      textActiveIndex !== null &&
      textArray &&
      textArray.length > 0 &&
      diary.objectID
    ) {
      const newMatches = textArray.filter((_, i) => i !== textActiveIndex);

      const languageTool = {
        ...diary.languageTool,
        textMatches: newMatches,
      };
      await firestore().doc(`diaries/${diary.objectID}`).update({
        languageTool,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

      if (textActiveIndex >= newMatches.length) {
        setTextActiveIndex(null);
      }

      editDiary(diary.objectID, {
        ...diary,
        languageTool,
      });
    }
  }, [textActiveIndex, textArray, diary, editDiary, setTextActiveIndex]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ViewShot
          style={styles.viewShot}
          ref={viewShotRef}
          options={{ format: 'jpg', quality: 0.9 }}
        >
          <View style={styles.mainContainer}>
            <DiaryHeader diary={diary} />
            <LanguageToolDiaryTitleAndText
              title={diary.title}
              text={diary.text}
              themeCategory={diary.themeCategory}
              themeSubcategory={diary.themeSubcategory}
              titleMatches={diary.languageTool?.titleMatches}
              textMatches={diary.languageTool?.textMatches}
              titleActiveIndex={titleActiveIndex}
              textActiveIndex={textActiveIndex}
              setTitleActiveIndex={setTitleActiveIndex}
              setTextActiveIndex={setTextActiveIndex}
            />
            <DiaryFooter text={diary.text} />
          </View>
        </ViewShot>
        <Space size={32} />
      </ScrollView>
      {diary.languageTool?.titleMatches &&
        diary.languageTool?.titleMatches.length > 0 &&
        titleActiveIndex !== null && (
          <Matches
            matches={diary.languageTool.titleMatches}
            activeIndex={titleActiveIndex}
            activeLeft={titleActiveLeft}
            activeRight={titleActiveRight}
            onPressLeft={onPressLeftTitle}
            onPressRight={onPressRightTitle}
            onPressClose={onPressClose}
            onPressIgnore={onPressIgnoreTitle}
          />
        )}
      {diary.languageTool?.textMatches &&
        diary.languageTool?.textMatches.length > 0 &&
        textActiveIndex !== null && (
          <Matches
            matches={diary.languageTool?.textMatches}
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

export default LanguageTool;
