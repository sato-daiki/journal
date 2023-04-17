import I18n from '@/utils/I18n';
import { Airplane } from '@/images';
import { getLanguage } from '@/utils/diary';
import { Entry } from '../interface';
import { GetParams, getWords } from '../util';

const WORD_NUM = 9;

export const trip = ({
  expressions,
  examples,
  learnLanguage,
}: GetParams): Entry[] => {
  const strLearnLanguage = getLanguage(learnLanguage);

  const words = getWords({
    learnLanguage,
    num: WORD_NUM,
    themeCategory: 'first',
    themeSubcategory: 'trip',
  });

  return [
    {
      key: 'introduction',
      params: {
        text: I18n.t('first.trip.introduction', {
          learnLanguage: strLearnLanguage,
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
