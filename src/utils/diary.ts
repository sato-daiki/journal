import { Diary, ThemeDiary, ThemeCategory, ThemeSubcategory } from '@/types';
import { subTextColor, mainColor, green, softRed } from '@/styles/Common';
import firestore from '@react-native-firebase/firestore';

import { MarkedDates } from '@/components/organisms/MyDiaryList';
import I18n from './I18n';
import { getDateToStrDay, getLastMonday, getThisMonday } from './common';
import { getAlgoliaDay } from './time';

export const MAX_TITLE = 100;
export const MAX_TEXT = 2000;

export const getThemeDiaries = (
  themeDiaries: ThemeDiary[] | undefined | null,
  objectID: string,
  themeCategory: ThemeCategory,
  themeSubcategory: ThemeSubcategory,
): ThemeDiary[] => {
  const findThemeDiary = themeDiaries?.find(
    (themeDiary) =>
      themeDiary.themeCategory === themeCategory &&
      themeDiary.themeSubcategory === themeSubcategory,
  );

  if (findThemeDiary && themeDiaries) {
    // 同一テーマを投稿した場合
    const newThemeDiaries = themeDiaries.map((themeDiary) => {
      if (
        themeDiary.themeCategory === themeCategory &&
        themeDiary.themeSubcategory === themeSubcategory
      ) {
        return {
          ...findThemeDiary,
          objectID,
          updatedAt: firestore.Timestamp.now(),
        };
      }
      return themeDiary;
    });
    return newThemeDiaries;
  }

  // 初回の場合
  return [
    ...(themeDiaries || []),
    {
      themeCategory,
      themeSubcategory,
      objectID,
      updatedAt: firestore.Timestamp.now(),
      createdAt: firestore.Timestamp.now(),
    },
  ];
};

export const getRunningDays = (
  runningDays: number | undefined,
  lastDiaryPostedAt: any | null | undefined,
): number => {
  // 初投稿の場合
  if (!lastDiaryPostedAt || !runningDays) return 1;

  const strTargetDay = getDateToStrDay(lastDiaryPostedAt.toDate());

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const strYesterday = getDateToStrDay(yesterday);

  if (strTargetDay === strYesterday) {
    // 昨日投稿していた場合
    return runningDays + 1;
  }

  const strToday = getDateToStrDay(new Date());

  if (strTargetDay === strToday) {
    // 今日投稿している場合
    return runningDays;
  }

  // 昨日より前に投稿していた場合
  return 1;
};

export const getRunningWeeks = (
  runningWeeks: number | undefined,
  lastDiaryPostedAt: any | null | undefined,
): number => {
  // 初回の場合
  if (!lastDiaryPostedAt || !runningWeeks) return 1;
  const strTargetThisMonday = getThisMonday(lastDiaryPostedAt.toDate());

  const strLastMonday = getLastMonday(new Date());

  if (strTargetThisMonday === strLastMonday) {
    // 最終投稿が1週間前の時
    return runningWeeks + 1;
  }

  const strThisMonday = getThisMonday(new Date());
  if (strTargetThisMonday === strThisMonday) {
    // 今週投稿している場合
    return runningWeeks;
  }

  // 先週の月曜日以降投稿していない場合
  return 1;
};

export const getPublishMessage = (
  beforeDays: number | null | undefined,
  beforeWeeks: number | null | undefined,
  afterDays: number,
  afterWeeks: number,
): string | null => {
  if (beforeDays === 0) {
    // 初回（0の場合もこっちに入る）
    return I18n.t('modalAlertPublish.first');
  }
  if (!beforeDays || !beforeWeeks) return I18n.t('modalAlertPublish.good');

  if (beforeDays + 1 === afterDays) {
    // 日が連続の場合
    return I18n.t('modalAlertPublish.runningDays', { runningDays: afterDays });
  }

  if (beforeWeeks + 1 === afterWeeks) {
    // 週が連続の場合
    return I18n.t('modalAlertPublish.runningWeeks', {
      runningWeeks: afterWeeks,
    });
  }
  return I18n.t('modalAlertPublish.good');
};

export const MY_STATUS = {
  draft: { text: I18n.t('myDiaryStatus.draft'), color: subTextColor },
  checked: { text: I18n.t('myDiaryStatus.checked'), color: mainColor },
  fairCopy: { text: I18n.t('myDiaryStatus.fairCopy'), color: green },
  recorded: { text: I18n.t('myDiaryStatus.recorded'), color: softRed },
};

export const getMyDiaryStatus = (diary: Diary) => {
  if (diary.diaryStatus === 'draft') {
    return MY_STATUS.draft;
  }
  if (diary.voiceUrl) {
    return MY_STATUS.recorded;
  }

  if (diary.fairCopyText || diary.fairCopyTitle) {
    return MY_STATUS.fairCopy;
  }

  return MY_STATUS.checked;
};

// 投稿済みの時はpublishedAt、下書きの時または以前verの時はcreatedAt
export const getMarkedDates = (newDiaries: Diary[]): MarkedDates =>
  newDiaries.reduce((prev, d) => {
    if (!d.objectID) return prev;
    const myDiaryStatus = getMyDiaryStatus(d);
    const date = getAlgoliaDay(d.publishedAt || d.createdAt, 'YYYY-MM-DD');
    const params = {
      key: d.objectID,
      selectedDotColor: '#fff',
      color: myDiaryStatus?.color,
    };

    return {
      ...prev,
      [date]: {
        dots: prev[date] ? [...prev[date].dots, params] : [params],
      },
    };
  }, {});

export const checkBeforePost = (
  title: string,
  text: string,
): { result: boolean; errorMessage: string } => {
  if (!title) {
    return { result: false, errorMessage: I18n.t('errorMessage.emptyTitile') };
  }
  if (!text) {
    return { result: false, errorMessage: I18n.t('errorMessage.emptyText') };
  }
  if (title.length > MAX_TITLE) {
    return {
      result: false,
      errorMessage: I18n.t('errorMessage.exceedingTitleCharacter', {
        textLength: MAX_TITLE,
      }),
    };
  }
  if (text.length > MAX_TEXT) {
    return {
      result: false,
      errorMessage: I18n.t('errorMessage.exceedingTextCharacter', {
        textLength: MAX_TEXT,
      }),
    };
  }

  return {
    result: true,
    errorMessage: '',
  };
};
