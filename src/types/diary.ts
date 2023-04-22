import { FieldValue } from '@firebase/firestore';
import { ThemeCategory, ThemeSubcategory } from './user';
import { CheckInfo } from './checkInfo';

// algolia経由で取得するのでtimestamp型が他と異なる
export type Timestamp = {
  _seconds: number;
  _nanoseconds: number;
};

export type DiaryStatus = 'draft' | 'checked' | 'fixed';

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
