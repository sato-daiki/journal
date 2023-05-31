import { Result } from './languageTool';

// 取得したまま
export interface RawTag {
  startPos: number;
  endPos: number;
  report: string;
  urls: string[] | null;
  category: string;
  categoryDisplayName: string;
  color: number;
  helpArticleId: number | null;
  realtimeCategory: string;
  subcategory: string;
  hint: string;
  suggestions: string[];
  isSubTag: boolean;
  helpId: string;
  id: string;
  invisible: boolean;
  realtimeColor: string;
  rephraseContext: string;
  rephraseModel: string;
  suggestionsDiffs: null;
  allowsOverlaps: boolean;
  hashId: string;
}

export interface Tag {
  startPos: number;
  endPos: number;
  hint: string;
  category: string;
  categoryDisplayName: string;
  suggestions: string[];
  urls: string[] | null;
}

export interface ProWritingAid {
  titleTags: Tag[] | [];
  titleResult: Result;
  titleError?: string | null;
  textTags: Tag[] | [];
  textResult: Result;
  textError?: string | null;
}
