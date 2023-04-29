import I18n from '@/utils/I18n';
import { Grind } from '@/images';
import { Entry } from '../interface';
import { GetParams, getWords } from '../util';

const WORD_NUM = 7;

export const study = ({
  expressions,
  examples,
  learnLanguage,
}: GetParams): Entry[] => {
  const words = getWords({
    learnLanguage,
    num: WORD_NUM,
    themeCategory: 'first',
    themeSubcategory: 'study',
  });

  return [
    {
      key: 'introduction',
      params: {
        text: I18n.t('first.study.introduction', {
          learnLanguage: 'en',
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
