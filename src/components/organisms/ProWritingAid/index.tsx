import React, { useCallback } from 'react';
import { Diary, Tag } from '../../../types';
import ProWritingAidDiaryTitleAndText from './ProWritingAidDiaryTitleAndText';
import { useCommon } from '@/components/organisms/LanguageTool/useCommon';
import CommonMain from '../LanguageTool/CommonMain';
import Tags from './Tags';

export interface Props {
  isPerfect: boolean;
  isOriginal: boolean;
  hideFooterButton: boolean;
  diary: Diary;
  title: string;
  text: string;
  titleArray: Tag[] | [] | undefined;
  textArray: Tag[] | [] | undefined;
  editDiary: (objectID: string, diary: Diary) => void;
  checkPermissions?: () => Promise<boolean>;
  goToRecord?: () => void;
  onPressRevise?: () => void;
}

const ProWritingAid: React.FC<Props> = ({
  isPerfect,
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
    (newTags: Tag[]) => {
      if (isOriginal && diary.proWritingAid) {
        return {
          proWritingAid: {
            ...diary.proWritingAid,
            titleTags: newTags,
          },
        };
      } else if (!isOriginal && diary.reviseProWritingAid) {
        return {
          reviseProWritingAid: {
            ...diary.reviseProWritingAid,
            titleTags: newTags,
          },
        };
      } else {
        return;
      }
    },
    [diary.reviseProWritingAid, diary.proWritingAid, isOriginal],
  );

  const getTextInfo = useCallback(
    (newTags: Tag[]) => {
      if (isOriginal && diary.proWritingAid) {
        return {
          proWritingAid: {
            ...diary.proWritingAid,
            textTags: newTags,
          },
        };
      } else if (!isOriginal && diary.reviseProWritingAid) {
        return {
          reviseProWritingAid: {
            ...diary.reviseProWritingAid,
            textTags: newTags,
          },
        };
      } else {
        return;
      }
    },
    [diary.reviseProWritingAid, diary.proWritingAid, isOriginal],
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
      hideFooterButton={hideFooterButton}
      diary={diary}
      text={text}
      checkPermissions={checkPermissions}
      goToRecord={goToRecord}
      onPressRevise={onPressRevise}
      titleAndText={
        <ProWritingAidDiaryTitleAndText
          isPerfect={isPerfect}
          title={title}
          text={text}
          longCode={diary.longCode}
          themeCategory={diary.themeCategory}
          themeSubcategory={diary.themeSubcategory}
          titleTags={titleArray}
          textTags={textArray}
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
          <Tags
            text={title}
            tags={titleArray}
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
          <Tags
            text={text}
            tags={textArray}
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

export default ProWritingAid;
