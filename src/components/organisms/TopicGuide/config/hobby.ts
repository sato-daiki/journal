import I18n from '@/utils/I18n';
import { Baseball } from '@/images';
import { Entry } from '../interface';
import { GetParams, getWords } from '../util';
import { getLanguageToolCode } from '@/utils/grammarCheck';

const WORD_NUM = 9;

export const hobby = ({
  expressions,
  examples,
  learnLanguage,
}: GetParams): Entry[] => {
  const words = getWords({
    learnLanguage,
    num: WORD_NUM,
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
