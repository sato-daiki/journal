import { DisplayProfile } from './diary';
// import { firestore } from 'firebase';

export interface Diff {
  count: number;
  added?: boolean;
  removed?: boolean;
  value: string;
}

export interface TextInfo {
  rowNumber: number;
  original: string;
  fix: string | null;
  detail: string | null;
  diffs: Diff[] | null;
}

export interface Comment {
  original: string;
  fix: string | null;
  detail: string | null;
  // 途中で追加した
  diffs?: Diff[] | null;
  rowNumber: number;
}

export interface Correction {
  objectID: string;
  user: DisplayProfile;
  comments: Comment[];
  summary: string;
  // createdAt: firestore.FieldValue;
}
