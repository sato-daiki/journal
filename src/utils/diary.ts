import {
  Diary,
  ThemeDiary,
  ThemeCategory,
  ThemeSubcategory,
  User,
} from '@/types';
import { subTextColor, green, softRed, primaryColor } from '@/styles/Common';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import { MarkedDates } from '@/components/organisms/MyDiaryList';
import I18n from './I18n';
import { getDateToStrDay, getLastMonday, getThisMonday } from './common';
import { getDay } from './time';
import { FetchInfoState } from '@/stores/reducers/diaryList';

export const MAX_TITLE = 100;
export const MAX_TEXT = 1200;

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

const getRunningDays = (
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

const getRunningWeeks = (
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

export const getRunning = (user: User) => {
  const runningDays = getRunningDays(user.runningDays, user.lastDiaryPostedAt);
  const runningWeeks = getRunningWeeks(
    user.runningWeeks,
    user.lastDiaryPostedAt,
  );
  return { runningDays, runningWeeks };
};

export const MY_STATUS = {
  draft: { text: I18n.t('myDiaryStatus.draft'), color: subTextColor },
  checked: { text: I18n.t('myDiaryStatus.checked'), color: primaryColor },
  revised: { text: I18n.t('myDiaryStatus.revised'), color: green },
  yet: { text: I18n.t('myDiaryStatus.yet'), color: subTextColor }, //人間の添削来待ち
  unread: { text: I18n.t('myDiaryStatus.unread'), color: softRed }, //人間の添削来待ち

  // テーマ一覧に出すよう
  done: { text: I18n.t('myDiaryStatus.done'), color: primaryColor },
};

export const getMyDiaryStatus = (diary: Diary) => {
  if (diary.diaryStatus === 'draft') {
    return MY_STATUS.draft;
  }
  if (diary.human?.status === 'yet') {
    return MY_STATUS.yet;
  }
  if (diary.human?.status === 'unread') {
    return MY_STATUS.unread;
  }

  if (diary.reviseText || diary.reviseTitle) {
    return MY_STATUS.revised;
  }

  return MY_STATUS.checked;
};

// 投稿済みの時はpublishedAt、下書きの時または以前verの時はcreatedAt
export const getMarkedDates = (newDiaries: Diary[]): MarkedDates =>
  newDiaries.reduce((prev, d) => {
    if (!d.objectID) return prev;
    const myDiaryStatus = getMyDiaryStatus(d);
    const date = getDay(
      d.publishedAt ? d.publishedAt.toDate() : d.createdAt.toDate(),
      'YYYY-MM-DD',
    );
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
  isTitleSkip: boolean,
  title: string,
  text: string,
): { result: boolean; errorMessage: string } => {
  if (!title) {
    return { result: false, errorMessage: I18n.t('errorMessage.emptyTitile') };
  }
  if (!text) {
    return { result: false, errorMessage: I18n.t('errorMessage.emptyText') };
  }
  if (!isTitleSkip && title.length > MAX_TITLE) {
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

export const getIsTopic = (
  themeCategory: ThemeCategory | null | undefined,
  themeSubcategory: ThemeSubcategory | null | undefined,
) => {
  if (
    themeCategory &&
    themeSubcategory &&
    (themeCategory === 'first' || themeCategory === 'second')
  ) {
    return true;
  }
  return false;
};

export const getDiaries = async (
  uid: string,
  lastVisible: FirebaseFirestoreTypes.Timestamp | Date | null,
  hitPerPage: number,
): Promise<Diary[]> => {
  try {
    const snapshot = await firestore()
      .collection('diaries')
      .where('uid', '==', uid)
      .orderBy('createdAt', 'desc')
      .startAfter(lastVisible)
      .limit(hitPerPage)
      .get();

    const diaries: Diary[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data() as Diary;
      diaries.push({
        objectID: doc.id,
        ...data,
      });
    });
    return diaries;
  } catch (e) {
    console.warn('getDiaries', e);
    return [];
  }
};

export const getDiaryNum = async (uid: string): Promise<number> => {
  const snap = await firestore()
    .collection('diaries')
    .where('uid', '==', uid)
    .countFromServer()
    .get();
  return snap.data().count;
};

const HIT_PER_PAGE = 20;
export const getLoadNextPage = async (
  fetchInfo: FetchInfoState,
  setFetchInfo: (fetchInfo: FetchInfoState) => void,
  uid: string,
  addDiaries: (diaries: Diary[]) => void,
): Promise<void> => {
  if (!fetchInfo.readingNext && !fetchInfo.readAllResults) {
    try {
      setFetchInfo({
        ...fetchInfo,
        readingNext: true,
      });
      const newDiaries = await getDiaries(
        uid,
        fetchInfo.lastVisible,
        HIT_PER_PAGE,
      );

      if (newDiaries.length === 0) {
        setFetchInfo({
          ...fetchInfo,
          readAllResults: true,
          readingNext: false,
        });
      } else {
        addDiaries(newDiaries);
        setFetchInfo({
          ...fetchInfo,
          lastVisible: newDiaries[newDiaries.length - 1].createdAt,
          readingNext: false,
        });
      }
    } catch (err: any) {
      setFetchInfo({
        ...fetchInfo,
        readingNext: false,
      });
      alert({ err });
    }
  }
};

const getPrettier = (text: string): string => {
  return text.replace(/[ 　]+/g, ' ');
};

export const getTitleTextPrettier = (
  isTitleSkip: boolean,
  title: string,
  text: string,
) => {
  const newTitle = isTitleSkip ? title : getPrettier(title);
  const newText = getPrettier(text);
  return { newTitle, newText };
};
