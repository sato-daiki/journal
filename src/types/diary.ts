import { ThemeCategory, ThemeSubcategory } from './user';
import { LanguageTool, LongCode } from './languageTool';
import { Sapling } from './sapling';

// algolia経由で取得するのでtimestamp型が他と異なる
export type Timestamp = {
  _seconds: number;
  _nanoseconds: number;
};

export type DiaryStatus = 'draft' | 'checked';

export interface Diary {
  objectID?: string;
  uid: string;
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
  languageTool?: LanguageTool | null;
  sapling?: Sapling | null;
  fairCopyLanguageTool?: LanguageTool | null;
  fairCopySapling?: Sapling | null;
  createdAt: Timestamp | any;
  updatedAt: Timestamp | any;
}
