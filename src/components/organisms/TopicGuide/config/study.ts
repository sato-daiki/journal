import I18n from '@/utils/I18n';
import { Grind } from '@/images';
import { Entry } from '../interface';
import { GetParams, getWords } from '../util';
import { getLanguageToolCode } from '@/utils/grammarCheck';

const WORD_NUM = 7;

export const study = ({
  expressions,
  examples,
  learnLanguage,
}: GetParams): Entry[] => {
  const words = getWords({
    learnLanguage,
    num: WORD_NUM,
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
