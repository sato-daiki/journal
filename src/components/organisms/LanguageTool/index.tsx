import React, { useCallback } from 'react';
import { Diary, Match } from '../../../types';
import Matches from './Matches';
import LanguageToolDiaryTitleAndText from './LanguageToolDiaryTitleAndText';
import { useCommon } from './useCommon';
import CommonMain from './CommonMain';

export interface Props {
  isPerfect: boolean;
  isOriginal: boolean;
  isPremium: boolean;
  showSaplingCheck: boolean;
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
  onPressCheck?: () => void;
  onPressAdReward?: () => void;
  onPressBecome?: () => void;
}

const LanguageTool: React.FC<Props> = ({
  isPerfect,
  isOriginal,
  isPremium,
  showSaplingCheck,
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
  onPressCheck,
  onPressAdReward,
  onPressBecome,
}) => {
  const getTitleInfo = useCallback(
    (newMatches: Match[]) => {
      if (isOriginal && diary.languageTool) {
        return {
          languageTool: {
            ...diary.languageTool,
            titleMatches: newMatches,
          },
        };
      } else if (!isOriginal && diary.reviseLanguageTool) {
        return {
          reviseLanguageTool: {
            ...diary.reviseLanguageTool,
            titleMatches: newMatches,
          },
        };
      } else {
        return;
      }
    },
    [diary.languageTool, diary.reviseLanguageTool, isOriginal],
  );

  const getTextInfo = useCallback(
    (newMatches: Match[]) => {
      if (isOriginal && diary.languageTool) {
        return {
          languageTool: {
            ...diary.languageTool,
            textMatches: newMatches,
          },
        };
      } else if (!isOriginal && diary.reviseLanguageTool) {
        return {
          reviseLanguageTool: {
            ...diary.reviseLanguageTool,
            textMatches: newMatches,
          },
        };
      } else {
        return;
      }
    },
    [diary.languageTool, diary.reviseLanguageTool, isOriginal],
  );

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
    onPressIgnoreTitle,
    onPressIgnoreText,
  } = useCommon({
    diary,
    titleArray,
    textArray,
    editDiary,
    getTitleInfo,
    getTextInfo,
  });

  return (
    <CommonMain
      viewShotRef={viewShotRef}
      isPremium={isPremium}
      isFullImage
      showSaplingCheck={showSaplingCheck}
      hideFooterButton={hideFooterButton}
      diary={diary}
      text={text}
      checkPermissions={checkPermissions}
      goToRecord={goToRecord}
      onPressRevise={onPressRevise}
      onPressCheck={onPressCheck}
      onPressAdReward={onPressAdReward}
      onPressBecome={onPressBecome}
      titleAndText={
        <LanguageToolDiaryTitleAndText
          isPerfect={isPerfect}
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
      }
      cardTitle={
        titleArray &&
        titleArray.length > 0 &&
        titleActiveIndex !== null && (
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
        )
      }
      cardText={
        textArray &&
        textArray.length > 0 &&
        textActiveIndex !== null && (
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
        )
      }
    />
  );
};

export default LanguageTool;
