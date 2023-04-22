import {
  Language,
  Diary,
  ThemeDiary,
  ThemeCategory,
  ThemeSubcategory,
  Word,
} from '@/types';
import { subTextColor, mainColor, green } from '@/styles/Common';

import { MarkedDates } from '@/components/organisms/MyDiaryList';
import I18n from './I18n';
import { getDateToStrDay, getLastMonday, getThisMonday } from './common';
import { getAlgoliaDay } from './time';
import { Timestamp } from '@firebase/firestore';

export const getLanguage = (language: Language): string => {
  return I18n.t(`language.${language}`);
};

export const getMaxPostText = (): number => {
  // maximum number of characters per minute: 75,000 (free) / 300,000 (Premium)
  // maximum number of characters per request: 20,000 (free) / 60,000 (Premium)
  // とりあえず2000に設定しておく
  // https://languagetool.org/http-api/swagger-ui/#!/default/post_check
  return 2000;
};

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
          updatedAt: Timestamp.now(),
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
      updatedAt: Timestamp.now(),
      createdAt: Timestamp.now(),
    },
  ];
};

export const getRunningDays = (
  runningDays: number | undefined,
  lastDiaryPostedAt: Timestamp | null | undefined,
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
  lastDiaryPostedAt: Timestamp | null | undefined,
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
  fixed: { text: I18n.t('myDiaryStatus.fixed'), color: green },
};

export const getMyDiaryStatus = (diaryStatus) => {
  if (diaryStatus === 'draft') return MY_STATUS.draft;
  else if (diaryStatus === 'checked') return MY_STATUS.checked;
  else if (diaryStatus === 'fixed') return MY_STATUS.fixed;
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

export const getWords = (text: string, matches: Match[]): Word[] => {
  const w = text.split(' ');
  let index = 0;
  const words = w.map((item) => {
    const checkedInfo = {
      checked: false,
      checkIndex: index++,
      underline: 'warning',
      ignore: false,
    };

    return {
      text: item,
      ...checkedInfo,
    };
  });
  return words;
};
