import {
  Airplane,
  Baseball,
  GraduationSpeech,
  Grind,
  Office,
  President,
  Skull,
} from '@/images';
import { LongCode } from '@/types';
import I18n from '@/utils/I18n';
import { TopicSubcategoryInfo } from '../interface';

interface FirstProps {
  learnLanguage: LongCode;
}
export const first = ({
  learnLanguage,
}: FirstProps): TopicSubcategoryInfo[] => {
  const nativeOption = {
    locale: 'ja',
  };
  const learnOption = {
    locale: learnLanguage,
  };

  return [
    {
      topicCategory: 'first',
      topicSubcategory: 'selfIntroduction',
      nativeTitle: I18n.t(
        'selectTopicSubcategory.firstList.selfIntroduction',
        nativeOption,
      ),
      learnTitle: I18n.t(
        'selectTopicSubcategory.firstList.selfIntroduction',
        learnOption,
      ),
      source: President,
    },
    {
      topicCategory: 'first',
      topicSubcategory: 'hobby',
      nativeTitle: I18n.t(
        'selectTopicSubcategory.firstList.hobby',
        nativeOption,
      ),
      learnTitle: I18n.t('selectTopicSubcategory.firstList.hobby', learnOption),

      source: Baseball,
    },
    {
      topicCategory: 'first',
      topicSubcategory: 'job',
      nativeTitle: I18n.t('selectTopicSubcategory.firstList.job', nativeOption),
      learnTitle: I18n.t('selectTopicSubcategory.firstList.job', learnOption),
      source: Office,
    },
    {
      topicCategory: 'first',
      topicSubcategory: 'study',
      nativeTitle: I18n.t(
        'selectTopicSubcategory.firstList.study',
        nativeOption,
      ),
      learnTitle: I18n.t('selectTopicSubcategory.firstList.study', learnOption),
      source: Grind,
    },
    {
      topicCategory: 'first',
      topicSubcategory: 'dream',
      nativeTitle: I18n.t(
        'selectTopicSubcategory.firstList.dream',
        nativeOption,
      ),
      learnTitle: I18n.t('selectTopicSubcategory.firstList.dream', learnOption),
      source: GraduationSpeech,
    },
    {
      topicCategory: 'first',
      topicSubcategory: 'trip',
      nativeTitle: I18n.t(
        'selectTopicSubcategory.firstList.trip',
        nativeOption,
      ),
      learnTitle: I18n.t('selectTopicSubcategory.firstList.trip', learnOption),
      source: Airplane,
    },
    {
      topicCategory: 'first',
      topicSubcategory: 'reborn',
      nativeTitle: I18n.t(
        'selectTopicSubcategory.firstList.reborn',
        nativeOption,
      ),
      learnTitle: I18n.t(
        'selectTopicSubcategory.firstList.reborn',
        learnOption,
      ),
      source: Skull,
    },
  ];
};
