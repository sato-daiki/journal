import { ThemeCategory, ThemeSubcategory } from './user';
import { LanguageTool, LongCode } from './languageTool';
import { Sapling } from './sapling';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Human } from './human';
import { ProWritingAid } from './proWritingAid';

export type DiaryStatus = 'draft' | 'checked';

export interface Diary {
  objectID?: string;
  uid: string;
  title: string;
  text: string;
  themeCategory?: ThemeCategory | null;
  themeSubcategory?: ThemeSubcategory | null;
  reviseTitle?: string | null;
  reviseText?: string | null;
  diaryStatus: DiaryStatus;
  voiceUrl?: string | null;
  publishedAt?: FirebaseFirestoreTypes.Timestamp;
  longCode: LongCode;
  languageTool?: LanguageTool;
  sapling?: Sapling;
  proWritingAid?: ProWritingAid;
  human?: Human;
  reviseLanguageTool?: LanguageTool;
  reviseSapling?: Sapling | null;
  reviseProWritingAid?: ProWritingAid | null;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
}
