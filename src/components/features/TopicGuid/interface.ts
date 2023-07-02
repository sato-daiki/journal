import { ImageSourcePropType } from 'react-native';

export type Entry =
  | {
      key: 'introduction';
      params: IntroductionParams;
    }
  | {
      key: 'tip';
      params: TipParams;
    }
  | {
      key: 'word';
      params: WordParams;
    }
  | {
      key: 'end';
      params: null;
    };

export interface IntroductionParams {
  source: ImageSourcePropType;
  text: string;
}

export interface TipParams {
  expressions: Sentence[];
  examples: StyleSentence[];
}

export interface WordParams {
  title: string;
  words: Sentence[];
}

export type WordKey = 'example' | 'expression';

export type StyleType = 'bold' | 'p';

export interface StyleText {
  key: string;
  text: string;
  styleType: 'bold' | 'p';
}

export interface StyleSentence {
  id: number;
  learnText: StyleText[];
  nativeText: string;
}

export interface Sentence {
  id: number;
  learnText: string;
  nativeText: string;
}
