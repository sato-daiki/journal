import { useCallback, useEffect, useMemo, useState } from 'react';
import { Edit, Match } from '../../../types';

export interface Props {
  titleArray?: Match[] | Edit[] | [];
  textArray?: Match[] | Edit[] | [];
}

export const useCommon = ({ titleArray, textArray }) => {
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

  return {
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
  };
};
