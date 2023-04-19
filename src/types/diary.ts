import { FieldValue } from '@firebase/firestore';
import { ThemeCategory, ThemeSubcategory } from './user';
// import firebase from 'firebase';

// algolia経由で取得するのでtimestamp型が他と異なる
export type Timestamp = {
  _seconds: number;
  _nanoseconds: number;
};

export type DiaryStatus = 'draft' | 'publish';
export type CorrectionStatus = 'yet' | 'correcting' | 'unread' | 'done';

export interface Diary {
  objectID?: string;
  uid: string;
  firstDiary: boolean;
  hidden: boolean;
  title: string;
  text: string;
  themeCategory?: ThemeCategory | null;
  themeSubcategory?: ThemeSubcategory | null;
  fairCopyTitle?: string | null;
  fairCopyText?: string | null;
  diaryStatus: DiaryStatus;
  voiceUrl?: string | null;
  publishedAt?: Timestamp | FieldValue;
  checkInfo: CheckInfo | null;
  createdAt?: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
}
