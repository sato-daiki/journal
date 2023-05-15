import { Result } from './languageTool';

export interface RawEdit {
  id: string;
  sentence: string;
  sentence_start: number;
  start: number;
  end: number;
  replacement: string;
  error_type: string;
  general_error_type: string;
}

export interface Edit {
  sentence: string;
  sentence_start: number;
  start: number;
  end: number;
  replacement: string;
  general_error_type: string;
}

export interface Sapling {
  titleEdits: Edit[] | [];
  titleResult: Result;
  titleError?: string | null;
  textEdits: Edit[] | [];
  textResult: Result;
  textError?: string | null;
}
