import I18n from '@/utils/I18n';
import { Office } from '@/images';
import { Entry } from '../interface';
import { GetParams, getWords } from '../util';

const WORD_NUM = 18;

export const job = ({
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
    themeSubcategory: 'job',
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
