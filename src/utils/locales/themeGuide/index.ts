import { StyleText } from '@/components/organisms/ThemeGuide';
import {
  enSelfIntroductionExpressions,
  enHobbyExpressions,
  enJobExpressions,
  enStudyExpressions,
  enDreamExpressions,
  enTripExpressions,
  enRebornExpressions,
  enSelfIntroductionExamples,
  enHobbyExamples,
  enJobExamples,
  enStudyExamples,
  enDreamExamples,
  enTripExamples,
  enRebornExamples,
} from './en';

export interface Expressions {
  en: string[];
  ja: string[];
  ko: string[];
  zh: string[];
}

export interface Examples {
  en: StyleText[][];
}

export const selfIntroductionExpressions: Expressions = {
  en: enSelfIntroductionExpressions,
};

export const hobbyExpressions: Expressions = {
  en: enHobbyExpressions,
};

export const jobExpressions: Expressions = {
  en: enJobExpressions,
};

export const studyExpressions: Expressions = {
  en: enStudyExpressions,
};

export const dreamExpressions: Expressions = {
  en: enDreamExpressions,
};

export const tripExpressions: Expressions = {
  en: enTripExpressions,
};

export const rebornExpressions: Expressions = {
  en: enRebornExpressions,
};

export const selfIntroductionExamples: Examples = {
  en: enSelfIntroductionExamples,
};

export const hobbyExamples: Examples = {
  en: enHobbyExamples,
};

export const jobExamples: Examples = {
  en: enJobExamples,
};

export const studyExamples: Examples = {
  en: enStudyExamples,
};

export const dreamExamples: Examples = {
  en: enDreamExamples,
};

export const tripExamples: Examples = {
  en: enTripExamples,
};

export const rebornExamples: Examples = {
  en: enRebornExamples,
};
