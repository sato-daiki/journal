import {
  Airplane,
  Baseball,
  GraduationSpeech,
  Grind,
  Office,
  President,
  Skull,
} from '@/images';
import { Language } from '@/types';
import I18n from '@/utils/I18n';
import { ThemeSubcategoryInfo } from '../interface';

interface FirstProps {
  nativeLanguage: Language;
  learnLanguage: Language;
}
export const first = ({
  nativeLanguage,
  learnLanguage,
}: FirstProps): ThemeSubcategoryInfo[] => {
  const nativeOption = {
    locale: nativeLanguage,
  };
  const learnOption = {
    locale: learnLanguage,
  };

  return [
    {
      themeCategory: 'first',
      themeSubcategory: 'selfIntroduction',
      nativeTitle: I18n.t(
        'selectThemeSubcategory.firstList.selfIntroduction',
        nativeOption
      ),
      learnTitle: I18n.t(
        'selectThemeSubcategory.firstList.selfIntroduction',
        learnOption
      ),
      source: President,
    },
    {
      themeCategory: 'first',
      themeSubcategory: 'hobby',
      nativeTitle: I18n.t(
        'selectThemeSubcategory.firstList.hobby',
        nativeOption
      ),
      learnTitle: I18n.t('selectThemeSubcategory.firstList.hobby', learnOption),

      source: Baseball,
    },
    {
      themeCategory: 'first',
      themeSubcategory: 'job',
      nativeTitle: I18n.t('selectThemeSubcategory.firstList.job', nativeOption),
      learnTitle: I18n.t('selectThemeSubcategory.firstList.job', learnOption),
      source: Office,
    },
    {
      themeCategory: 'first',
      themeSubcategory: 'study',
      nativeTitle: I18n.t(
        'selectThemeSubcategory.firstList.study',
        nativeOption
      ),
      learnTitle: I18n.t('selectThemeSubcategory.firstList.study', learnOption),
      source: Grind,
    },
    {
      themeCategory: 'first',
      themeSubcategory: 'dream',
      nativeTitle: I18n.t(
        'selectThemeSubcategory.firstList.dream',
        nativeOption
      ),
      learnTitle: I18n.t('selectThemeSubcategory.firstList.dream', learnOption),
      source: GraduationSpeech,
    },
    {
      themeCategory: 'first',
      themeSubcategory: 'trip',
      nativeTitle: I18n.t(
        'selectThemeSubcategory.firstList.trip',
        nativeOption
      ),
      learnTitle: I18n.t('selectThemeSubcategory.firstList.trip', learnOption),
      source: Airplane,
    },
    {
      themeCategory: 'first',
      themeSubcategory: 'reborn',
      nativeTitle: I18n.t(
        'selectThemeSubcategory.firstList.reborn',
        nativeOption
      ),
      learnTitle: I18n.t(
        'selectThemeSubcategory.firstList.reborn',
        learnOption
      ),
      source: Skull,
    },
  ];
};
