export interface Edit {
  id: string;
  sentence: string;
  sentence_start: number;
  start: number;
  end: number;
  replacement: string;
  error_type: string;
  general_error_type: string;
}

export interface Sapling {
  titleEdits?: Edit[] | [];
  textEdits?: Edit[] | [];
}
