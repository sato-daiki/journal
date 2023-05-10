import React, { useCallback, useRef } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { Diary, Edit } from '../../../types';
import { Space } from '../../atoms';
import firestore from '@react-native-firebase/firestore';
import DiaryHeader from '@/components/molecules/DiaryHeader';
import DiaryFooter from '@/components/molecules/DiaryFooter';
import SaplingDiaryTitleAndText from './SaplingDiaryTitleAndText';
import Edits from './Edits';
import { useCommon } from '@/components/organisms/LanguageTool/useCommon';

export interface Props {
  hideFooterButton: boolean;
  diary: Diary;
  title: string;
  text: string;
  titleArray: Edit[] | [] | undefined;
  textArray: Edit[] | [] | undefined;
  editDiary: (objectID: string, diary: Diary) => void;
  checkPermissions?: () => Promise<boolean>;
  goToRecord?: () => void;
  onPressRevise?: () => void;
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

const Sapling: React.FC<Props> = ({
  hideFooterButton,
  diary,
  title,
  text,
  titleArray,
  textArray,
  editDiary,
  checkPermissions,
  goToRecord,
  onPressRevise,
}) => {
  const viewShotRef = useRef<ViewShot | null>(null);

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
  }, [titleActiveIndex, titleArray, diary, editDiary, setTitleActiveIndex]);

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
              title={title}
              text={text}
              themeCategory={diary.themeCategory}
              themeSubcategory={diary.themeSubcategory}
              titleEdits={titleArray}
              textEdits={textArray}
              titleActiveIndex={titleActiveIndex}
              textActiveIndex={textActiveIndex}
              setTitleActiveIndex={setTitleActiveIndex}
              setTextActiveIndex={setTextActiveIndex}
            />
          </View>
          <DiaryFooter
            hideFooterButton={hideFooterButton}
            text={text}
            longCode={diary.longCode}
            voiceUrl={diary.voiceUrl}
            checkPermissions={checkPermissions}
            goToRecord={goToRecord}
            onPressRevise={onPressRevise}
          />
        </ViewShot>
        <Space size={32} />
      </ScrollView>
      {titleArray && titleArray.length > 0 && titleActiveIndex !== null && (
        <Edits
          edits={titleArray}
          activeIndex={titleActiveIndex}
          activeLeft={titleActiveLeft}
          activeRight={titleActiveRight}
          onPressLeft={onPressLeftTitle}
          onPressRight={onPressRightTitle}
          onPressClose={onPressClose}
          onPressIgnore={onPressIgnoreTitle}
        />
      )}

      {textArray && textArray.length > 0 && textActiveIndex !== null && (
        <Edits
          edits={textArray}
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
