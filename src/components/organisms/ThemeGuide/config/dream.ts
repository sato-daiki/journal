import I18n from '@/utils/I18n';
import { GraduationSpeech } from '@/images';
import { Entry } from '../interface';
import { GetParams, getWords } from '../util';

const WORD_NUM = 9;

export const dream = ({
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
    themeSubcategory: 'dream',
  });

  return [
    {
      key: 'introduction',
      params: {
        text: I18n.t('first.dream.introduction'),
        source: GraduationSpeech,
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
        title: I18n.t('first.dream.wordTitle'),
        words,
      },
    },
  ];
};
