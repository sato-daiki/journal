import React, { useCallback, useRef } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { Diary } from '../../../types';
import { Space } from '../../atoms';
import firestore from '@react-native-firebase/firestore';
import DiaryHeader from '@/components/molecules/DiaryHeader';
import DiaryFooter from '@/components/molecules/DiaryFooter';
import SaplingDiaryTitleAndText from './SaplingDiaryTitleAndText';
import Edits from './Edits';
import { useCommon } from '@/components/organisms/LanguageTool/useCommon';

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

const Sapling: React.FC<Props> = ({ diary, editDiary }) => {
  const viewShotRef = useRef<ViewShot | null>(null);

  const titleArray = diary.sapling?.titleEdits;
  const textArray = diary.sapling?.textEdits;

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
      diary.sapling?.titleEdits &&
      diary.sapling?.titleEdits.length > 0 &&
      diary.objectID
    ) {
      const newMatches = diary.sapling?.titleEdits.filter(
        (_, i) => i !== titleActiveIndex,
      );

      const sapling = {
        ...diary.sapling,
        titleEdits: newMatches,
      };
      await firestore().doc(`diaries/${diary.objectID}`).update({
        sapling,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

      if (titleActiveIndex >= newMatches.length) {
        setTitleActiveIndex(null);
      }

      editDiary(diary.objectID, {
        ...diary,
        sapling,
      });
    }
  }, [titleActiveIndex, diary, editDiary, setTitleActiveIndex]);

  const onPressIgnoreText = useCallback(async () => {
    if (
      textActiveIndex !== null &&
      diary.sapling?.textEdits &&
      diary.sapling?.textEdits.length > 0 &&
      diary.objectID
    ) {
      const newMatches = diary.sapling.textEdits.filter(
        (_, i) => i !== textActiveIndex,
      );

      const sapling = {
        ...diary.sapling,
        textEdits: newMatches,
      };
      await firestore().doc(`diaries/${diary.objectID}`).update({
        sapling,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

      if (textActiveIndex >= newMatches.length) {
        setTextActiveIndex(null);
      }

      editDiary(diary.objectID, {
        ...diary,
        sapling,
      });
    }
  }, [textActiveIndex, diary, editDiary, setTextActiveIndex]);

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
            <SaplingDiaryTitleAndText
              title={diary.title}
              text={diary.text}
              themeCategory={diary.themeCategory}
              themeSubcategory={diary.themeSubcategory}
              titleEdits={diary.sapling?.titleEdits}
              textEdits={diary.sapling?.textEdits}
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
      {diary.sapling?.titleEdits &&
        diary.sapling?.titleEdits.length > 0 &&
        titleActiveIndex !== null && (
          <Edits
            edits={diary.sapling.titleEdits}
            activeIndex={titleActiveIndex}
            activeLeft={titleActiveLeft}
            activeRight={titleActiveRight}
            onPressLeft={onPressLeftTitle}
            onPressRight={onPressRightTitle}
            onPressClose={onPressClose}
            onPressIgnore={onPressIgnoreTitle}
          />
        )}

      {diary.sapling?.textEdits &&
        diary.sapling?.textEdits.length > 0 &&
        textActiveIndex !== null && (
          <Edits
            edits={diary.sapling?.textEdits}
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

export default Sapling;
