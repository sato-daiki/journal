import React, { useCallback, useMemo } from 'react';
import { Diary, HumanCorrect } from '../../../types';
import { useCommon } from '@/components/organisms/LanguageTool/useCommon';
import CommonMain from '../LanguageTool/CommonMain';
import HumanDiaryTitleAndText from './HumanDiaryTitleAndText';
import HumanCorrects from './HumanCorrects';

export interface Props {
  hideFooterButton: boolean;
  diary: Diary;
  editDiary: (objectID: string, diary: Diary) => void;
  checkPermissions?: () => Promise<boolean>;
  goToRecord?: () => void;
  onPressRevise?: () => void;
}

const Human: React.FC<Props> = ({
  hideFooterButton,
  diary,
  editDiary,
  checkPermissions,
  goToRecord,
  onPressRevise,
}) => {
  const title = useMemo(() => {
    let newTitle = '';
    if (diary.human) {
      for (let i = 0; i < diary.human.titleCorrects.length; i++) {
        newTitle += diary.human.titleCorrects[i];
      }
    }
    return newTitle;
  }, [diary.human]);

  const text = useMemo(() => {
    let newText = '';
    if (diary.human) {
      for (let i = 0; i < diary.human.textCorrects.length; i++) {
        newText += diary.human.textCorrects[i];
      }
    }
    return newText;
  }, [diary.human]);

  const titleFilterArray = useMemo(
    () => diary.human?.titleCorrects.filter((item) => !!item.correction),
    [diary.human?.titleCorrects],
  );

  const textFilterArray = useMemo(
    () => diary.human?.textCorrects.filter((item) => !!item.correction),
    [diary.human?.textCorrects],
  );

  const titlAllArray = useMemo(
    () => diary.human?.titleCorrects,
    [diary.human?.titleCorrects],
  );

  const textAllArray = useMemo(
    () => diary.human?.textCorrects,
    [diary.human?.textCorrects],
  );

  const getTitleInfo = useCallback(
    (humanCorrects: HumanCorrect[]) => {
      return diary.human
        ? {
            human: {
              ...diary.human,
              titleCorrect: humanCorrects,
            },
          }
        : undefined;
    },
    [diary.human],
  );

  const getTextInfo = useCallback(
    (humanCorrects: HumanCorrect[]) => {
      return diary.human
        ? {
            human: {
              ...diary.human,
              textCorrect: humanCorrects,
            },
          }
        : undefined;
    },
    [diary.human],
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
  } = useCommon({
    diary,
    titleArray: titleFilterArray,
    textArray: textFilterArray,
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
        <HumanDiaryTitleAndText
          diary={diary}
          title={title}
          text={text}
          titleArray={titlAllArray}
          textArray={textAllArray}
          titleActiveIndex={titleActiveIndex}
          textActiveIndex={textActiveIndex}
          setTitleActiveIndex={setTitleActiveIndex}
          setTextActiveIndex={setTextActiveIndex}
          onPressShare={onPressShare}
        />
      }
      cardTitle={
        titleFilterArray &&
        titleFilterArray.length > 0 &&
        titleActiveIndex !== null && (
          <HumanCorrects
            filterArray={titleFilterArray}
            activeIndex={titleActiveIndex}
            activeLeft={titleActiveLeft}
            activeRight={titleActiveRight}
            onPressLeft={onPressLeftTitle}
            onPressRight={onPressRightTitle}
            onPressClose={onPressClose}
          />
        )
      }
      cardText={
        textFilterArray &&
        textFilterArray.length > 0 &&
        textActiveIndex !== null && (
          <HumanCorrects
            filterArray={textFilterArray}
            activeIndex={textActiveIndex}
            activeLeft={textActiveLeft}
            activeRight={textActiveRight}
            onPressLeft={onPressLeftText}
            onPressRight={onPressRightText}
            onPressClose={onPressClose}
          />
        )
      }
    />
  );
};

export default Human;
