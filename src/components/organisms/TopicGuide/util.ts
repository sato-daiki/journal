import { LongCode, TopicCategory, TopicSubcategory } from '@/types';
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
} from '@/utils/locales/topicGuide';
import { Entry, Sentence, StyleSentence } from './interface';
import {
  Airplane,
  Baseball,
  GraduationSpeech,
  Grind,
  Office,
  President,
  Skull,
} from '@/images';
import { getLanguageToolCode } from '@/utils/grammarCheck';

export interface GetParams {
  expressions: Sentence[];
  examples: StyleSentence[];
  learnLanguage: LongCode;
}

interface GetEntriesParams {
  topicCategory: TopicCategory;
  topicSubcategory: TopicSubcategory;
  learnLanguage: LongCode;
}

interface GetExamples {
  topicCategory: TopicCategory;
  topicSubcategory: TopicSubcategory;
  learnLanguage: LongCode;
}

interface GetWordsParams {
  learnLanguage: LongCode;
  num: number;
  topicCategory: TopicCategory;
  topicSubcategory: TopicSubcategory;
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
  expressions,
  nativeOption,
  i18nTextHeader,
}: GetSentencesParams): Sentence[] | null => {
  const newExpressions = expressions.en;

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
  topicCategory,
  topicSubcategory,
  learnLanguage,
}: GetExamples): Sentence[] | null => {
  const params = {
    nativeOption: {
      locale: 'ja',
    },
    i18nTextHeader: `${topicCategory}.${topicSubcategory}.expression`,
  };

  switch (topicSubcategory) {
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
  examples,
  nativeOption,
  i18nTextHeader,
}: GetStyleSentencesParams): StyleSentence[] | null => {
  const newExamples = examples.en;

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
  topicCategory,
  topicSubcategory,
  learnLanguage,
}: GetExamples): StyleSentence[] | null => {
  const params = {
    nativeOption: {
      locale: 'ja',
    },
    i18nTextHeader: `${topicCategory}.${topicSubcategory}.example`,
  };

  switch (topicSubcategory) {
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
  learnLanguage,
  num,
  topicCategory,
  topicSubcategory,
}: GetWordsParams): Sentence[] => {
  const nativeOption = {
    locale: 'ja',
  };
  const learnOption = {
    locale: learnLanguage,
  };

  const array = [...Array(num)].map((_, i) => i + 1);

  const sentences = array.map((item) => {
    const i18nText = `${topicCategory}.${topicSubcategory}.word${item}`;
    return {
      id: item,
      nativeText: I18n.t(i18nText, nativeOption),
      learnText: I18n.t(i18nText, learnOption),
    };
  });

  return sentences;
};

export const getEntries = ({
  topicCategory,
  topicSubcategory,
  learnLanguage,
}: GetEntriesParams): Entry[] | null => {
  let entries: Entry[] | null = null;

  const expressions = getExpressions({
    topicCategory,
    topicSubcategory,
    learnLanguage,
  });

  const examples = getExamples({
    topicCategory,
    topicSubcategory,
    learnLanguage,
  });

  if (!expressions || !examples) return null;

  const params = {
    expressions,
    examples,
    learnLanguage,
  };

  switch (topicSubcategory) {
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

  return entries ? entries.concat({ key: 'end', params: null }) : null;
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

const selfIntroduction = ({
  expressions,
  examples,
  learnLanguage,
}: GetParams): Entry[] | null => {
  const words = getWords({
    learnLanguage,
    num: 10,
    topicCategory: 'first',
    topicSubcategory: 'selfIntroduction',
  });

  return [
    {
      key: 'introduction',
      params: {
        text: I18n.t('first.selfIntroduction.introduction', {
          learnLanguage: I18n.t(
            `language.${getLanguageToolCode(learnLanguage)}`,
          ),
        }),
        source: President,
      },
    },
    {
      key: 'tip',
      params: {
        examples,
        expressions,
      },
    },
    {
      key: 'word',
      params: {
        title: I18n.t('first.selfIntroduction.wordTitle'),
        words,
      },
    },
  ];
};

const hobby = ({
  expressions,
  examples,
  learnLanguage,
}: GetParams): Entry[] => {
  const words = getWords({
    learnLanguage,
    num: 9,
    topicCategory: 'first',
    topicSubcategory: 'hobby',
  });

  return [
    {
      key: 'introduction',
      params: {
        text: I18n.t('first.hobby.introduction', {
          learnLanguage: I18n.t(
            `language.${getLanguageToolCode(learnLanguage)}`,
          ),
        }),
        source: Baseball,
      },
    },
    {
      key: 'tip',
      params: {
        examples,
        expressions,
      },
    },
    {
      key: 'word',
      params: {
        title: I18n.t('first.hobby.wordTitle'),
        words,
      },
    },
  ];
};

const job = ({ expressions, examples, learnLanguage }: GetParams): Entry[] => {
  const words = getWords({
    learnLanguage,
    num: 18,
    topicCategory: 'first',
    topicSubcategory: 'job',
  });

  return [
    {
      key: 'introduction',
      params: {
        text: I18n.t('first.job.introduction'),
        source: Office,
      },
    },
    {
      key: 'tip',
      params: {
        examples,
        expressions,
      },
    },
    {
      key: 'word',
      params: {
        title: I18n.t('first.job.wordTitle'),
        words,
      },
    },
  ];
};

const study = ({
  expressions,
  examples,
  learnLanguage,
}: GetParams): Entry[] => {
  const words = getWords({
    learnLanguage,
    num: 7,
    topicCategory: 'first',
    topicSubcategory: 'study',
  });

  return [
    {
      key: 'introduction',
      params: {
        text: I18n.t('first.study.introduction', {
          learnLanguage: I18n.t(
            `language.${getLanguageToolCode(learnLanguage)}`,
          ),
        }),
        source: Grind,
      },
    },
    {
      key: 'tip',
      params: {
        examples,
        expressions,
      },
    },
    {
      key: 'word',
      params: {
        title: I18n.t('first.study.wordTitle'),
        words,
      },
    },
  ];
};

const dream = ({
  expressions,
  examples,
  learnLanguage,
}: GetParams): Entry[] => {
  const words = getWords({
    learnLanguage,
    num: 9,
    topicCategory: 'first',
    topicSubcategory: 'dream',
  });

  return [
    {
      key: 'introduction',
      params: {
        text: I18n.t('first.dream.introduction'),
        source: GraduationSpeech,
      },
    },
    {
      key: 'tip',
      params: {
        examples,
        expressions,
      },
    },
    {
      key: 'word',
      params: {
        title: I18n.t('first.dream.wordTitle'),
        words,
      },
    },
  ];
};

const trip = ({ expressions, examples, learnLanguage }: GetParams): Entry[] => {
  const words = getWords({
    learnLanguage,
    num: 9,
    topicCategory: 'first',
    topicSubcategory: 'trip',
  });

  return [
    {
      key: 'introduction',
      params: {
        text: I18n.t('first.trip.introduction', {
          learnLanguage: I18n.t(
            `language.${getLanguageToolCode(learnLanguage)}`,
          ),
        }),
        source: Airplane,
      },
    },
    {
      key: 'tip',
      params: {
        examples,
        expressions,
      },
    },
    {
      key: 'word',
      params: {
        title: I18n.t('first.trip.wordTitle'),
        words,
      },
    },
  ];
};

const reborn = ({
  expressions,
  examples,
  learnLanguage,
}: GetParams): Entry[] => {
  const words = getWords({
    learnLanguage,
    num: 4,
    topicCategory: 'first',
    topicSubcategory: 'reborn',
  });

  return [
    {
      key: 'introduction',
      params: {
        text: I18n.t('first.reborn.introduction'),
        source: Skull,
      },
    },
    {
      key: 'tip',
      params: {
        examples,
        expressions,
      },
    },
    {
      key: 'word',
      params: {
        title: I18n.t('first.reborn.wordTitle'),
        words,
      },
    },
  ];
};
