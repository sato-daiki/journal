import I18n from '@/utils/I18n';
import { President } from '@/images';
import { Entry } from '../interface';
import { GetParams, getWords } from '../util';

const WORD_NUM = 10;

export const selfIntroduction = ({
  expressions,
  examples,
  learnLanguage,
}: GetParams): Entry[] => {
  const words = getWords({
    learnLanguage,
    num: WORD_NUM,
    themeCategory: 'first',
    themeSubcategory: 'selfIntroduction',
  });

  return [
    {
      key: 'introduction',
      params: {
        text: I18n.t('first.selfIntroduction.introduction', {
          learnLanguage: 'en',
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
