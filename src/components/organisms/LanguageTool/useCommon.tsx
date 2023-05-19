import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { Diary, Edit, LanguageTool, Match, Sapling } from '../../../types';
import { appShare, diaryShare } from '@/utils/common';
import ViewShot from 'react-native-view-shot';
import firestore from '@react-native-firebase/firestore';

export interface Props {
  diary: Diary;
  titleArray?: any; // Match[] | Edit[] | [];
  textArray?: any; //Match[] | Edit[] | [];
  editDiary: (objectID: string, diary: Diary) => void;
  getTitleInfo: (
    newInfo: any, //Match[] | Edit[],
  ) => any; //LanguageTool | Sapling | undefined;
  getTextInfo: (
    newInfo: any, //Match[] | Edit[],
  ) => any; //LanguageTool | Sapling | undefined;
}

export const useCommon = ({
  diary,
  titleArray,
  textArray,
  editDiary,
  getTitleInfo,
  getTextInfo,
}: Props) => {
  const viewShotRef = useRef<ViewShot | null>(null);

  const [textActiveIndex, setTextActiveIndex] = useState<number | null>(null);
  const [titleActiveIndex, setTitleActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (titleArray && titleArray.length > 0) {
      setTitleActiveIndex(0);
    } else if (textArray && textArray.length > 0) {
      setTextActiveIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const titleActiveLeft = useMemo(() => {
    if (titleActiveIndex !== null && titleActiveIndex !== 0) {
      return true;
    }
    return false;
  }, [titleActiveIndex]);

  const titleActiveRight = useMemo(() => {
    if (
      (titleArray &&
        titleArray.length > 0 &&
        titleActiveIndex !== null &&
        titleActiveIndex !== titleArray.length - 1) ||
      (!!textArray && textArray.length > 0)
    ) {
      return true;
    }
    return false;
  }, [textArray, titleActiveIndex, titleArray]);

  const textActiveLeft = useMemo(() => {
    if (
      (textActiveIndex !== null && textActiveIndex !== 0) ||
      (!!titleArray && titleArray.length > 0)
    ) {
      return true;
    }
    return false;
  }, [textActiveIndex, titleArray]);

  const textActiveRight = useMemo(() => {
    if (
      textActiveIndex !== null &&
      textArray &&
      textActiveIndex < textArray.length - 1
    ) {
      return true;
    }
    return false;
  }, [textActiveIndex, textArray]);

  const onPressLeftTitle = useCallback(() => {
    setTitleActiveIndex(titleActiveIndex! - 1);
  }, [titleActiveIndex]);

  const onPressRightTitle = useCallback(() => {
    if (
      textActiveRight &&
      textArray &&
      titleActiveIndex !== textArray.length - 1
    ) {
      setTitleActiveIndex(titleActiveIndex! + 1);
    } else {
      setTitleActiveIndex(null);
      setTextActiveIndex(0);
    }
  }, [textActiveRight, textArray, titleActiveIndex]);

  const onPressLeftText = useCallback(() => {
    if (textActiveLeft && textActiveIndex !== 0) {
      setTextActiveIndex(textActiveIndex! - 1);
    } else {
      setTextActiveIndex(null);
      setTitleActiveIndex(titleArray!.length - 1);
    }
  }, [textActiveIndex, textActiveLeft, titleArray]);

  const onPressRightText = useCallback(() => {
    if (textActiveRight) {
      setTextActiveIndex(textActiveIndex! + 1);
    }
  }, [textActiveIndex, textActiveRight]);

  const onPressClose = useCallback(() => {
    setTitleActiveIndex(null);
    setTextActiveIndex(null);
  }, []);

  const onPressShare = useCallback(async () => {
    if (viewShotRef?.current?.capture) {
      const imageUrl = await viewShotRef.current.capture();
      diaryShare(imageUrl);
    } else {
      appShare();
    }
  }, []);

  const onPressIgnoreTitle = useCallback(async () => {
    if (
      titleActiveIndex !== null &&
      titleArray &&
      titleArray.length > 0 &&
      diary.objectID
    ) {
      const newArray = titleArray.filter((_, i) => i !== titleActiveIndex);
      const titleInfo = getTitleInfo(newArray);
      if (!titleInfo) return;

      await firestore()
        .doc(`diaries/${diary.objectID}`)
        .update({
          ...titleInfo,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

      if (titleActiveIndex >= newArray.length) {
        setTitleActiveIndex(null);
      }

      editDiary(diary.objectID, {
        ...diary,
        ...titleInfo,
      });
    }
  }, [titleActiveIndex, titleArray, diary, getTitleInfo, editDiary]);

  const onPressIgnoreText = useCallback(async () => {
    if (
      textActiveIndex !== null &&
      textArray &&
      textArray.length > 0 &&
      diary.objectID
    ) {
      const newArray = textArray.filter((_, i) => i !== textActiveIndex);
      const textInfo = getTextInfo(newArray);
      if (!textInfo) return;

      await firestore()
        .doc(`diaries/${diary.objectID}`)
        .update({
          ...textInfo,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

      if (textActiveIndex >= newArray.length) {
        setTextActiveIndex(null);
      }

      editDiary(diary.objectID, {
        ...diary,
        ...textInfo,
      });
    }
  }, [textActiveIndex, textArray, diary, getTextInfo, editDiary]);

  return {
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
  };
};
