import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { LongCode } from './languageTool';

export type TopicCategory = 'first' | 'second';

export type EikenCategory = 'eiken1' | 'eikenPre1' | 'eiken2' | 'eikenPre2';

export type ThemeCategory = TopicCategory | EikenCategory;

export type FirstSubcategory =
  | 'selfIntroduction'
  | 'hobby'
  | 'job'
  | 'study'
  | 'dream'
  | 'trip'
  | 'reborn';

export type SecondSubcategory = 'test1' | 'test2';

export type Eiken1Subcategory =
  | '1-2022-3'
  | '1-2022-2'
  | '1-2022-1'
  | '1-2021-3'
  | '1-2021-2'
  | '1-2021-1'
  | '1-2020-3'
  | '1-2020-2'
  | '1-2020-1'
  | '1-2019-3'
  | '1-2019-2'
  | '1-2019-1'
  | '1-2018-3'
  | '1-2018-2'
  | '1-2018-1'
  | '1-2017-3'
  | '1-2017-2'
  | '1-2017-1';

export type EikenPre1Subcategory =
  | 'pre1-2022-3'
  | 'pre1-2022-2'
  | 'pre1-2022-1'
  | 'pre1-2021-3'
  | 'pre1-2021-2'
  | 'pre1-2021-1'
  | 'pre1-2020-3'
  | 'pre1-2020-2'
  | 'pre1-2020-1'
  | 'pre1-2019-3'
  | 'pre1-2019-2'
  | 'pre1-2019-1'
  | 'pre1-2018-3'
  | 'pre1-2018-2'
  | 'pre1-2018-1'
  | 'pre1-2017-3'
  | 'pre1-2017-2'
  | 'pre1-2017-1';

export type Eiken2Subcategory =
  | '2-2022-3'
  | '2-2022-2'
  | '2-2022-1'
  | '2-2021-3'
  | '2-2021-2'
  | '2-2021-1'
  | '2-2020-3'
  | '2-2020-2'
  | '2-2020-1'
  | '2-2019-3'
  | '2-2019-2'
  | '2-2019-1'
  | '2-2018-3'
  | '2-2018-2'
  | '2-2018-1'
  | '2-2017-3'
  | '2-2017-2'
  | '2-2017-1';

export type EikenPre2Subcategory =
  | 'pre2-2022-3'
  | 'pre2-2022-2'
  | 'pre2-2022-1'
  | 'pre2-2021-3'
  | 'pre2-2021-2'
  | 'pre2-2021-1'
  | 'pre2-2020-3'
  | 'pre2-2020-2'
  | 'pre2-2020-1'
  | 'pre2-2019-3'
  | 'pre2-2019-2'
  | 'pre2-2019-1'
  | 'pre2-2018-3'
  | 'pre2-2018-2'
  | 'pre2-2018-1'
  | 'pre2-2017-3'
  | 'pre2-2017-2'
  | 'pre2-2017-1';

export type TopicSubcategory = FirstSubcategory | SecondSubcategory;

export type EikenSubcategory =
  | Eiken1Subcategory
  | EikenPre1Subcategory
  | Eiken2Subcategory
  | EikenPre2Subcategory;

export type ThemeSubcategory = TopicSubcategory | EikenSubcategory;

export interface ThemeDiary {
  themeCategory: ThemeCategory;
  themeSubcategory: ThemeSubcategory;
  objectID: string;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
  createdAt: FirebaseFirestoreTypes.Timestamp;
}

export interface RemindeDay {
  day: number; // Sunday - Saturday : 0 - 6
  timeStart: Date;
  timeEnd: Date;
}

export type ReminderType = 'custom' | 'fix';

export interface CustomTimeInfo {
  day: number;
  checked: boolean;
  timeStart: Date;
  timeEnd: Date;
  isFocus: boolean;
}

export interface FixDay {
  day: number;
  checked: boolean;
}

export interface FixTimeInfo {
  timeStart: Date;
  timeEnd: Date;
  isFocus: boolean;
}

interface Fix {
  reminderType: 'fix';
  fixDays: FixDay[];
  fixTimeInfo: FixTimeInfo;
}

interface Custom {
  reminderType: 'custom';
  customTimeInfos: CustomTimeInfo[];
}

export type TimeInfo = Fix | Custom;

export interface Reminder {
  notificationStart: boolean;
  notificationEnd: boolean;
  timeInfo: TimeInfo;
}

export interface User {
  uid: string;
  isPremium: boolean;
  learnLanguage: LongCode;
  diaryPosted: boolean;
  onboarding?: boolean;
  expoPushToken: string | null;
  themeDiaries?: ThemeDiary[] | null;
  reminder?: Reminder;
  runningDays?: number;
  runningWeeks?: number;
  lastDiaryPostedAt?: FirebaseFirestoreTypes.Timestamp | null;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
}
