import I18n from '@/utils/I18n';
import { Baseball } from '@/images';
import { Entry } from '../interface';
import { GetParams, getWords } from '../util';

const WORD_NUM = 9;

export const hobby = ({
  expressions,
  examples,
  learnLanguage,
}: GetParams): Entry[] => {
  const words = getWords({
    learnLanguage,
    num: WORD_NUM,
    themeCategory: 'first',
    themeSubcategory: 'hobby',
  });

  return [
    {
      key: 'introduction',
      params: {
        text: I18n.t('first.hobby.introduction', {
          learnLanguage: 'en',
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
