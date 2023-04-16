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
import {
  jaSelfIntroductionExpressions,
  jaHobbyExpressions,
  jaJobExpressions,
  jaStudyExpressions,
  jaDreamExpressions,
  jaTripExpressions,
  jaRebornExpressions,
  jaSelfIntroductionExamples,
  jaHobbyExamples,
  jaJobExamples,
  jaStudyExamples,
  jaDreamExamples,
  jaTripExamples,
  jaRebornExamples,
} from './ja';

export interface Expressions {
  en: string[];
  ja: string[];
  ko: string[];
  zh: string[];
}

export interface Examples {
  en: StyleText[][];
  ja: StyleText[][];
}

export const selfIntroductionExpressions: Expressions = {
  en: enSelfIntroductionExpressions,
  ja: jaSelfIntroductionExpressions,
};

export const hobbyExpressions: Expressions = {
  en: enHobbyExpressions,
  ja: jaHobbyExpressions,
};

export const jobExpressions: Expressions = {
  en: enJobExpressions,
  ja: jaJobExpressions,
};

export const studyExpressions: Expressions = {
  en: enStudyExpressions,
  ja: jaStudyExpressions,
};

export const dreamExpressions: Expressions = {
  en: enDreamExpressions,
  ja: jaDreamExpressions,
};

export const tripExpressions: Expressions = {
  en: enTripExpressions,
  ja: jaTripExpressions,
};

export const rebornExpressions: Expressions = {
  en: enRebornExpressions,
  ja: jaRebornExpressions,
};

export const selfIntroductionExamples: Examples = {
  en: enSelfIntroductionExamples,
  ja: jaSelfIntroductionExamples,
};

export const hobbyExamples: Examples = {
  en: enHobbyExamples,
  ja: jaHobbyExamples,
};

export const jobExamples: Examples = {
  en: enJobExamples,
  ja: jaJobExamples,
};

export const studyExamples: Examples = {
  en: enStudyExamples,
  ja: jaStudyExamples,
};

export const dreamExamples: Examples = {
  en: enDreamExamples,
  ja: jaDreamExamples,
};

export const tripExamples: Examples = {
  en: enTripExamples,
  ja: jaTripExamples,
};

export const rebornExamples: Examples = {
  en: enRebornExamples,
  ja: jaRebornExamples,
};
