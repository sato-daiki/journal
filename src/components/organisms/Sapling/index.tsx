import React, { useCallback } from 'react';
import { Diary, Edit } from '../../../types';
import SaplingDiaryTitleAndText from './SaplingDiaryTitleAndText';
import Edits from './Edits';
import { useCommon } from '@/components/organisms/LanguageTool/useCommon';
import CommonMain from '../LanguageTool/CommonMain';

export interface Props {
  isOriginal: boolean;
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

const Sapling: React.FC<Props> = ({
  isOriginal,
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
  const getTitleInfo = useCallback(
    (newEdits: Edit[]) => {
      if (isOriginal && diary.sapling) {
        return {
          sapling: {
            ...diary.sapling,
            titleEdits: newEdits,
          },
        };
      } else if (!isOriginal && diary.reviseSapling) {
        return {
          reviseSapling: {
            ...diary.reviseSapling,
            titleEdits: newEdits,
          },
        };
      } else {
        return;
      }
    },
    [diary.reviseSapling, diary.sapling, isOriginal],
  );

  const getTextInfo = useCallback(
    (newEdits: Edit[]) => {
      if (isOriginal && diary.sapling) {
        return {
          sapling: {
            ...diary.sapling,
            textEdits: newEdits,
          },
        };
      } else if (!isOriginal && diary.reviseSapling) {
        return {
          reviseSapling: {
            ...diary.reviseSapling,
            textEdits: newEdits,
          },
        };
      } else {
        return;
      }
    },
    [diary.reviseSapling, diary.sapling, isOriginal],
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
      showAdReward={false}
      hideFooterButton={hideFooterButton}
      diary={diary}
      text={text}
      checkPermissions={checkPermissions}
      goToRecord={goToRecord}
      onPressRevise={onPressRevise}
      titleAndText={
        <SaplingDiaryTitleAndText
          title={title}
          text={text}
          longCode={diary.longCode}
          themeCategory={diary.themeCategory}
          themeSubcategory={diary.themeSubcategory}
          titleEdits={titleArray}
          textEdits={textArray}
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
        )
      }
      cardText={
        textArray &&
        textArray.length > 0 &&
        textActiveIndex !== null && (
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
        )
      }
    />
  );
};

export default Sapling;
