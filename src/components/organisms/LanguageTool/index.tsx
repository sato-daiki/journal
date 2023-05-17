import React, { useCallback } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { Diary, Match } from '../../../types';
import { Space } from '../../atoms';
import firestore from '@react-native-firebase/firestore';
import Matches from './Matches';
import LanguageToolDiaryTitleAndText from './LanguageToolDiaryTitleAndText';
import DiaryHeader from '@/components/molecules/DiaryHeader';
import DiaryFooter from '@/components/molecules/DiaryFooter';
import { useCommon } from './useCommon';

export interface Props {
  isOrigin: boolean;
  showAdReward: boolean;
  hideFooterButton: boolean;
  diary: Diary;
  title: string;
  text: string;
  titleArray: Match[] | [] | undefined;
  textArray: Match[] | [] | undefined;
  editDiary: (objectID: string, diary: Diary) => void;
  checkPermissions?: () => Promise<boolean>;
  goToRecord?: () => void;
  onPressRevise?: () => void;
  onPressAdReward?: () => void;
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

const LanguageTool: React.FC<Props> = ({
  isOrigin,
  showAdReward,
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
  onPressAdReward,
}) => {
  const {
    viewShotRef,
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
    onPressShare,
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
      let languageToolInfo;
      if (isOrigin && diary.languageTool) {
        languageToolInfo = {
          languageTool: {
            ...diary.languageTool,
            titleMatches: newMatches,
          },
        };
      } else if (!isOrigin && diary.reviseLanguageTool) {
        languageToolInfo = {
          reviseLanguageTool: {
            ...diary.reviseLanguageTool,
            titleMatches: newMatches,
          },
        };
      } else {
        return;
      }

      await firestore()
        .doc(`diaries/${diary.objectID}`)
        .update({
          ...languageToolInfo,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

      if (titleActiveIndex >= newMatches.length) {
        setTitleActiveIndex(null);
      }

      editDiary(diary.objectID, {
        ...diary,
        ...languageToolInfo,
      });
    }
  }, [
    titleActiveIndex,
    titleArray,
    diary,
    isOrigin,
    editDiary,
    setTitleActiveIndex,
  ]);

  const onPressIgnoreText = useCallback(async () => {
    if (
      textActiveIndex !== null &&
      textArray &&
      textArray.length > 0 &&
      diary.objectID
    ) {
      const newMatches = textArray.filter((_, i) => i !== textActiveIndex);
      let languageToolInfo;
      if (isOrigin && diary.languageTool) {
        languageToolInfo = {
          languageTool: {
            ...diary.languageTool,
            textMatches: newMatches,
          },
        };
      } else if (!isOrigin && diary.reviseLanguageTool) {
        languageToolInfo = {
          reviseLanguageTool: {
            ...diary.reviseLanguageTool,
            textMatches: newMatches,
          },
        };
      } else {
        return;
      }
      await firestore()
        .doc(`diaries/${diary.objectID}`)
        .update({
          ...languageToolInfo,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

      if (textActiveIndex >= newMatches.length) {
        setTextActiveIndex(null);
      }

      editDiary(diary.objectID, {
        ...diary,
        ...languageToolInfo,
      });
    }
  }, [
    textActiveIndex,
    textArray,
    diary,
    isOrigin,
    editDiary,
    setTextActiveIndex,
  ]);

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
              title={title}
              text={text}
              longCode={diary.longCode}
              themeCategory={diary.themeCategory}
              themeSubcategory={diary.themeSubcategory}
              titleMatches={titleArray}
              textMatches={textArray}
              titleActiveIndex={titleActiveIndex}
              textActiveIndex={textActiveIndex}
              setTitleActiveIndex={setTitleActiveIndex}
              setTextActiveIndex={setTextActiveIndex}
              onPressShare={onPressShare}
            />
          </View>
          <DiaryFooter
            hideFooterButton={hideFooterButton}
            showAdReward={showAdReward}
            text={text}
            longCode={diary.longCode}
            voiceUrl={diary.voiceUrl}
            checkPermissions={checkPermissions}
            goToRecord={goToRecord}
            onPressRevise={onPressRevise}
            onPressAdReward={onPressAdReward}
          />
        </ViewShot>
        <Space size={32} />
      </ScrollView>
      {titleArray && titleArray.length > 0 && titleActiveIndex !== null && (
        <Matches
          text={title}
          matches={titleArray}
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
        <Matches
          text={text}
          matches={textArray}
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
