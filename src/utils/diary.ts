// import { firestore } from 'firebase';
// import firebase from '@/constants/firebase';
import {
  CorrectionStatus,
  Language,
  User,
  DisplayProfile,
  Diary,
  CountryCode,
  ThemeDiary,
  ThemeCategory,
  ThemeSubcategory,
} from '@/types';
import { softRed, subTextColor, mainColor, green } from '@/styles/Common';

import { MarkedDates } from '@/components/organisms/MyDiaryList';
import I18n from './I18n';
import { DataCorrectionStatus } from './correcting';
import { getDateToStrDay, getLastMonday, getThisMonday } from './common';
import { getAlgoliaDay } from './time';

interface Status {
  text: string;
  color: string;
}

// 日記一覧に出力するステータスの取得
export const getUserDiaryStatus = (
  correctionStatus: CorrectionStatus,
  correctionStatus2: CorrectionStatus | undefined,
  correctionStatus3: CorrectionStatus | undefined,
): Status | null => {
  // 0添削の場合
  if (correctionStatus === 'yet') {
    return { text: I18n.t('userDiaryStatus.yet'), color: mainColor };
  }

  // 何か1つでも添削中の場合
  if (
    correctionStatus === 'correcting' ||
    correctionStatus2 === 'correcting' ||
    correctionStatus3 === 'correcting'
  ) {
    return { text: I18n.t('userDiaryStatus.correcting'), color: subTextColor };
  }

  // 添削が終わった数を取得
  let correctedNum = 0;
  if (correctionStatus === 'unread' || correctionStatus === 'done') {
    correctedNum += 1;
  }
  if (correctionStatus2 === 'unread' || correctionStatus2 === 'done') {
    correctedNum += 1;
  }
  if (correctionStatus3 === 'unread' || correctionStatus3 === 'done') {
    correctedNum += 1;
  }

  if (correctedNum > 0) {
    return {
      text: I18n.t('userDiaryStatus.done', { correctedNum }),
      color: subTextColor,
    };
  }
  // ここに入ることはない
  return null;
};

export const MY_STATUS = {
  unread: { text: I18n.t('myDiaryStatus.unread'), color: softRed },
  draft: { text: I18n.t('draftListItem.draft'), color: subTextColor },
  yet: { text: I18n.t('myDiaryStatus.yet'), color: mainColor },
  done: { text: I18n.t('myDiaryStatus.done'), color: green },
  posted: { text: I18n.t('myDiaryStatus.posted'), color: green },
};

export const getMyDiaryStatus = (diary: Diary): Status | null => {
  const {
    diaryStatus,
    correctionStatus,
    correctionStatus2,
    correctionStatus3,
  } = diary;

  if (diaryStatus === 'draft') return MY_STATUS.draft;

  if (
    correctionStatus === 'unread' ||
    correctionStatus2 === 'unread' ||
    correctionStatus3 === 'unread'
  ) {
    return MY_STATUS.unread;
  }

  if (correctionStatus === 'yet' || correctionStatus === 'correcting') {
    return MY_STATUS.yet;
  }

  return MY_STATUS.done;
};

// export const allLanguage: Language[] = ['ja', 'en', 'zh', 'ko'];
export const allLanguage: Language[] = ['ja', 'en'];

export const getLanguageNum = (): number => {
  return allLanguage.length;
};

// すでに選択された言語、ネイティブ言語、勉強中の言語を除く
export const getTargetLanguages = (
  learnLanguage,
  spokenLanguages,
): Language[] => {
  return allLanguage.filter((item) => {
    if (item === learnLanguage) return false;
    if (spokenLanguages) {
      for (let i = 0; i <= spokenLanguages.length; i += 1) {
        if (spokenLanguages[i] === item) return false;
      }
    }
    return true;
  });
};

export const getLanguage = (language: Language): string => {
  return I18n.t(`language.${language}`);
};

export const getExceptUser = (uids: string[]): string => {
  if (!uids) return '';

  let fillterText = '';
  for (let i = 0; i < uids.length; i += 1) {
    fillterText += ` AND NOT user.uid: ${uids[i]}`;
  }
  return fillterText;
};

export const getDisplayProfile = (user: User): DisplayProfile => {
  return {
    uid: user.uid,
    learnLanguage: user.learnLanguage,
  };
};

export const updateUnread = async (
  objectID: string,
  data: DataCorrectionStatus | null,
): Promise<void> => {
  await firebase
    .firestore()
    .doc(`diaries/${objectID}`)
    .update({
      ...data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
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
          updatedAt: firebase.firestore.Timestamp.now(),
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
      updatedAt: firebase.firestore.Timestamp.now(),
      createdAt: firebase.firestore.Timestamp.now(),
    },
  ];
};

export const getRunningDays = (
  runningDays: number | undefined,
  lastDiaryPostedAt: firestore.Timestamp | null | undefined,
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
  lastDiaryPostedAt: firestore.Timestamp | null | undefined,
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
