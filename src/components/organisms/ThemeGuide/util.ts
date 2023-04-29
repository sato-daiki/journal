import { Language, LongCode, ThemeCategory, ThemeSubcategory } from '@/types';
import { TextStyle } from 'react-native';
import I18n from '@/utils/I18n';
import {
  dreamExamples,
  dreamExpressions,
  Examples,
  Expressions,
  hobbyExamples,
  hobbyExpressions,
  jobExamples,
  jobExpressions,
  rebornExamples,
  rebornExpressions,
  selfIntroductionExamples,
  selfIntroductionExpressions,
  studyExamples,
  studyExpressions,
  tripExamples,
  tripExpressions,
} from '@/utils/locales/themeGuide';
import {
  hobby,
  selfIntroduction,
  job,
  study,
  dream,
  trip,
  reborn,
} from './config';
import { Entry, Sentence, StyleSentence, StyleText } from './interface';

export interface GetParams {
  expressions: Sentence[];
  examples: StyleSentence[];
  learnLanguage: LongCode;
}

interface GetEntriesParams {
  themeCategory: ThemeCategory;
  themeSubcategory: ThemeSubcategory;
  learnLanguage: LongCode;
}

interface GetExamples {
  themeCategory: ThemeCategory;
  themeSubcategory: ThemeSubcategory;
  learnLanguage: LongCode;
}

interface GetWordsParams {
  themeCategory: ThemeCategory;
  themeSubcategory: ThemeSubcategory;
  learnLanguage: LongCode;
  num: number;
}

interface GetSentencesParams {
  learnLanguage: LongCode;
  expressions: Expressions;
  nativeOption: object;
  i18nTextHeader: string;
}

interface GetStyleSentencesParams {
  learnLanguage: LongCode;
  examples: Examples;
  nativeOption: object;
  i18nTextHeader: string;
}

const getSentences = ({
  learnLanguage,
  expressions,
  nativeOption,
  i18nTextHeader,
}: GetSentencesParams): Sentence[] | null => {
  let newExpressions: string[];
  switch (learnLanguage) {
    case 'en':
      newExpressions = expressions.en;
      break;
    default:
      return null;
  }

  return newExpressions.map((item, index) => {
    const i18nText = `${i18nTextHeader}${index + 1}`;
    return {
      id: index + 1,
      learnText: item,
      nativeText: I18n.t(i18nText, nativeOption),
    };
  });
};

const getExpressions = ({
  themeCategory,
  themeSubcategory,
  learnLanguage,
}: GetExamples): Sentence[] | null => {
  const params = {
    nativeOption: {
      locale: 'ja',
    },
    i18nTextHeader: `${themeCategory}.${themeSubcategory}.expression`,
  };

  switch (themeSubcategory) {
    case 'selfIntroduction':
      return getSentences({
        learnLanguage,
        expressions: selfIntroductionExpressions,
        ...params,
      });
    case 'hobby':
      return getSentences({
        learnLanguage,
        expressions: hobbyExpressions,
        ...params,
      });
    case 'job':
      return getSentences({
        learnLanguage,
        expressions: jobExpressions,
        ...params,
      });
    case 'study':
      return getSentences({
        learnLanguage,
        expressions: studyExpressions,
        ...params,
      });
    case 'dream':
      return getSentences({
        learnLanguage,
        expressions: dreamExpressions,
        ...params,
      });
    case 'trip':
      return getSentences({
        learnLanguage,
        expressions: tripExpressions,
        ...params,
      });
    case 'reborn':
      return getSentences({
        learnLanguage,
        expressions: rebornExpressions,
        ...params,
      });
    default:
      return null;
  }
};

const getStyleSentences = ({
  learnLanguage,
  examples,
  nativeOption,
  i18nTextHeader,
}: GetStyleSentencesParams): StyleSentence[] | null => {
  let newExamples: StyleText[][];

  switch (learnLanguage) {
    case 'en':
      newExamples = examples.en;
      break;
    default:
      return null;
  }

  return newExamples.map((item, index) => {
    const i18nText = `${i18nTextHeader}${index + 1}`;
    return {
      id: index + 1,
      learnText: item,
      nativeText: I18n.t(i18nText, nativeOption),
    };
  });
};

export const getExamples = ({
  themeCategory,
  themeSubcategory,
  learnLanguage,
}: GetExamples): StyleSentence[] | null => {
  const params = {
    nativeOption: {
      locale: 'ja',
    },
    i18nTextHeader: `${themeCategory}.${themeSubcategory}.example`,
  };

  switch (themeSubcategory) {
    case 'selfIntroduction':
      return getStyleSentences({
        learnLanguage,
        examples: selfIntroductionExamples,
        ...params,
      });
    case 'hobby':
      return getStyleSentences({
        learnLanguage,
        examples: hobbyExamples,
        ...params,
      });
    case 'job':
      return getStyleSentences({
        learnLanguage,
        examples: jobExamples,
        ...params,
      });
    case 'study':
      return getStyleSentences({
        learnLanguage,
        examples: studyExamples,
        ...params,
      });
    case 'dream':
      return getStyleSentences({
        learnLanguage,
        examples: dreamExamples,
        ...params,
      });
    case 'trip':
      return getStyleSentences({
        learnLanguage,
        examples: tripExamples,
        ...params,
      });
    case 'reborn':
      return getStyleSentences({
        learnLanguage,
        examples: rebornExamples,
        ...params,
      });

    default:
      return null;
  }
};

export const getWords = ({
  themeCategory,
  themeSubcategory,
  learnLanguage,
  num,
}: GetWordsParams): Sentence[] => {
  const nativeOption = {
    locale: 'ja',
  };
  const learnOption = {
    locale: learnLanguage,
  };

  const array = [...Array(num)].map((_, i) => i + 1);

  const sentences = array.map((item) => {
    const i18nText = `${themeCategory}.${themeSubcategory}.word${item}`;
    return {
      id: item,
      nativeText: I18n.t(i18nText, nativeOption),
      learnText: I18n.t(i18nText, learnOption),
    };
  });

  return sentences;
};

export const getEntries = ({
  themeCategory,
  themeSubcategory,
  learnLanguage,
}: GetEntriesParams): Entry[] | null => {
  let entries: Entry[] | null = null;

  const expressions = getExpressions({
    themeCategory,
    themeSubcategory,
    learnLanguage,
  });

  const examples = getExamples({
    themeCategory,
    themeSubcategory,
    learnLanguage,
  });

  if (!expressions || !examples) return null;

  const params = {
    expressions,
    examples,
    learnLanguage,
  };

  switch (themeSubcategory) {
    case 'selfIntroduction':
      entries = selfIntroduction(params);
      break;
    case 'hobby':
      entries = hobby(params);
      break;
    case 'job':
      entries = job(params);
      break;
    case 'study':
      entries = study(params);
      break;
    case 'dream':
      entries = dream(params);
      break;
    case 'trip':
      entries = trip(params);
      break;
    case 'reborn':
      entries = reborn(params);
      break;
    default:
      return null;
  }

  return entries.concat({ key: 'end', params: null });
};

export const getStyle = (styleType: 'bold' | 'p'): TextStyle | undefined => {
  switch (styleType) {
    case 'bold':
      return {
        fontWeight: 'bold',
      };
    case 'p':
      return undefined;
    default:
      return undefined;
  }
};
