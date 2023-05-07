import I18n from '@/utils/I18n';
import { Airplane } from '@/images';
import { Entry } from '../interface';
import { GetParams, getWords } from '../util';

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
          learnLanguage: 'en',
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
