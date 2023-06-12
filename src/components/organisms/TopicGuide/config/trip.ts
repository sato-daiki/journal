import I18n from '@/utils/I18n';
import { Airplane } from '@/images';
import { Entry } from '../interface';
import { GetParams, getWords } from '../util';
import { getLanguageToolCode } from '@/utils/grammarCheck';

const WORD_NUM = 9;

export const trip = ({
  expressions,
  examples,
  learnLanguage,
}: GetParams): Entry[] => {
  const words = getWords({
    learnLanguage,
    num: WORD_NUM,
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
