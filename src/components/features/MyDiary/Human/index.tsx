import React, { useCallback, useEffect, useMemo } from 'react';
import { Diary, HumanCorrect, Human as HumanType } from '../../../../types';
import HumanDiaryTitleAndText from './HumanDiaryTitleAndText';
import HumanCorrects from './HumanCorrects';
import firestore from '@react-native-firebase/firestore';
import { useCommon } from '../CommonAi/useCommon';
import CommonMain from '../CommonAi/CommonMain';

interface Props {
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
  useEffect(() => {
    const f = async () => {
      if (diary.human?.status === 'unread') {
        // eslint-disable-next-line no-undef
        const newHuman: HumanType = {
          ...diary.human,
          status: 'done',
        };
        await firestore().doc(`diaries/${diary.objectID}`).update({
          human: newHuman,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
        editDiary(diary.objectID!, {
          ...diary,
          human: newHuman,
        });
      }
    };
    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const title = useMemo(() => {
    let newTitle = '';
    if (diary.human && diary.human.titleCorrects) {
      for (let i = 0; i < diary.human.titleCorrects.length; i++) {
        newTitle += diary.human.titleCorrects[i];
      }
    }
    return newTitle;
  }, [diary.human]);

  const text = useMemo(() => {
    let newText = '';
    if (diary.human && diary.human.textCorrects) {
      for (let i = 0; i < diary.human.textCorrects.length; i++) {
        newText += diary.human.textCorrects[i];
      }
    }
    return newText;
  }, [diary.human]);

  const titleFilterArray = useMemo(
    () => diary.human?.titleCorrects?.filter((item) => !!item.correction),
    [diary.human?.titleCorrects],
  );

  const textFilterArray = useMemo(
    () => diary.human?.textCorrects?.filter((item) => !!item.correction),
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
          isPerfect={false}
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
