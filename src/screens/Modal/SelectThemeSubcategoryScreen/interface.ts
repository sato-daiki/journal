import { ThemeCategory, ThemeSubcategory } from '@/types';
import { ImageSourcePropType } from 'react-native';

export type CallerThemeGuide = 'PostDiary' | 'SelectThemeSubcategory';

export interface ThemeSubcategoryInfo {
  themeCategory: ThemeCategory;
  themeSubcategory: ThemeSubcategory;
  nativeTitle: string;
  learnTitle: string;
  source: ImageSourcePropType;
}
