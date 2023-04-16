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
import {
  koDreamExpressions,
  koHobbyExpressions,
  koJobExpressions,
  koRebornExpressions,
  koSelfIntroductionExpressions,
  koStudyExpressions,
  koTripExpressions,
  koDreamExamples,
  koHobbyExamples,
  koJobExamples,
  koRebornExamples,
  koSelfIntroductionExamples,
  koStudyExamples,
  koTripExamples,
} from './ko';
import {
  zhDreamExpressions,
  zhHobbyExpressions,
  zhJobExpressions,
  zhRebornExpressions,
  zhSelfIntroductionExpressions,
  zhStudyExpressions,
  zhTripExpressions,
  zhDreamExamples,
  zhHobbyExamples,
  zhJobExamples,
  zhRebornExamples,
  zhSelfIntroductionExamples,
  zhStudyExamples,
  zhTripExamples,
} from './zh';

export interface Expressions {
  en: string[];
  ja: string[];
  ko: string[];
  zh: string[];
}

export interface Examples {
  en: StyleText[][];
  ja: StyleText[][];
  ko: StyleText[][];
  zh: StyleText[][];
}

export const selfIntroductionExpressions: Expressions = {
  en: enSelfIntroductionExpressions,
  ja: jaSelfIntroductionExpressions,
  ko: koSelfIntroductionExpressions,
  zh: zhSelfIntroductionExpressions,
};

export const hobbyExpressions: Expressions = {
  en: enHobbyExpressions,
  ja: jaHobbyExpressions,
  ko: koHobbyExpressions,
  zh: zhHobbyExpressions,
};

export const jobExpressions: Expressions = {
  en: enJobExpressions,
  ja: jaJobExpressions,
  ko: koJobExpressions,
  zh: zhJobExpressions,
};

export const studyExpressions: Expressions = {
  en: enStudyExpressions,
  ja: jaStudyExpressions,
  ko: koStudyExpressions,
  zh: zhStudyExpressions,
};

export const dreamExpressions: Expressions = {
  en: enDreamExpressions,
  ja: jaDreamExpressions,
  ko: koDreamExpressions,
  zh: zhDreamExpressions,
};

export const tripExpressions: Expressions = {
  en: enTripExpressions,
  ja: jaTripExpressions,
  ko: koTripExpressions,
  zh: zhTripExpressions,
};

export const rebornExpressions: Expressions = {
  en: enRebornExpressions,
  ja: jaRebornExpressions,
  ko: koRebornExpressions,
  zh: zhRebornExpressions,
};

export const selfIntroductionExamples: Examples = {
  en: enSelfIntroductionExamples,
  ja: jaSelfIntroductionExamples,
  ko: koSelfIntroductionExamples,
  zh: zhSelfIntroductionExamples,
};

export const hobbyExamples: Examples = {
  en: enHobbyExamples,
  ja: jaHobbyExamples,
  ko: koHobbyExamples,
  zh: zhHobbyExamples,
};

export const jobExamples: Examples = {
  en: enJobExamples,
  ja: jaJobExamples,
  ko: koJobExamples,
  zh: zhJobExamples,
};

export const studyExamples: Examples = {
  en: enStudyExamples,
  ja: jaStudyExamples,
  ko: koStudyExamples,
  zh: zhStudyExamples,
};

export const dreamExamples: Examples = {
  en: enDreamExamples,
  ja: jaDreamExamples,
  ko: koDreamExamples,
  zh: zhDreamExamples,
};

export const tripExamples: Examples = {
  en: enTripExamples,
  ja: jaTripExamples,
  ko: koTripExamples,
  zh: zhTripExamples,
};

export const rebornExamples: Examples = {
  en: enRebornExamples,
  ja: jaRebornExamples,
  ko: koRebornExamples,
  zh: zhRebornExamples,
};
