import { ThemeCategory, ThemeSubcategory } from './user';
import { LongCode, Match } from './match';

// algolia経由で取得するのでtimestamp型が他と異なる
export type Timestamp = {
  _seconds: number;
  _nanoseconds: number;
};

export type DiaryStatus = 'draft' | 'checked';

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
  publishedAt?: Timestamp | any;
  longCode: LongCode;
  titleMatches?: Match[] | [];
  textMatches?: Match[] | [];
  createdAt: Timestamp | any;
  updatedAt: Timestamp | any;
}
