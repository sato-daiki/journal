import I18n from '@/utils/I18n';
import { Skull } from '@/images';
import { Entry } from '../interface';
import { GetParams, getWords } from '../util';

const WORD_NUM = 4;

export const reborn = ({
  expressions,
  examples,
  nativeLanguage,
  learnLanguage,
}: GetParams): Entry[] => {
  const words = getWords({
    nativeLanguage,
    learnLanguage,
    num: WORD_NUM,
    themeCategory: 'first',
    themeSubcategory: 'reborn',
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
