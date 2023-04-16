import I18n from '@/utils/I18n';
import { President } from '@/images';
import { getLanguage } from '@/utils/diary';
import { Entry } from '../interface';
import { GetParams, getWords } from '../util';

const WORD_NUM = 10;

export const selfIntroduction = ({
  expressions,
  examples,
  nativeLanguage,
  learnLanguage,
}: GetParams): Entry[] => {
  const strLearnLanguage = getLanguage(learnLanguage);

  const words = getWords({
    nativeLanguage,
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
          learnLanguage: strLearnLanguage,
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
