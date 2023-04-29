export type Language = 'en' | 'de' | 'es' | 'fr' | 'pt' | 'nl';
export const languages: Language[] = ['en', 'de', 'es', 'fr', 'pt', 'nl'];

export type ThemeCategory = 'first';
export type ThemeSubcategory =
  | 'selfIntroduction'
  | 'hobby'
  | 'job'
  | 'study'
  | 'dream'
  | 'trip'
  | 'reborn';

export interface ThemeDiary {
  themeCategory: ThemeCategory;
  themeSubcategory: ThemeSubcategory;
  objectID: string;
  updatedAt: any;
  createdAt: any;
}

export type AppReviewState = 'yet' | 'never' | 'done';

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
  learnLanguage: Language;
  diaryPosted: boolean;
  onboarding?: boolean;
  tutorialTeachDiaryList: boolean;
  tutorialCorrectiong: boolean;
  expoPushToken: string | null;
  correctingObjectID: string | null;
  correctingCorrectedNum: number | null;
  notificationCorrection: boolean;
  notificationReview: boolean;
  mailCorrection?: boolean;
  mailOperation?: boolean;
  themeDiaries?: ThemeDiary[] | null;
  appReviewState?: AppReviewState;
  reminder?: Reminder;
  runningDays?: number;
  runningWeeks?: number;
  lastDiaryPostedAt?: any | null;
  lastModalAppSuggestionAt?: any | null;
  lastModalNotficationSettingAt?: any | null;
  lastWatchAdAt: any | null;
  createdAt: any;
  updatedAt: any;
}
