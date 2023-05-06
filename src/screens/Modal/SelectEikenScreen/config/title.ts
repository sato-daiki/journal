import { EikenCategory, EikenSubcategory, ThemeCategory } from '@/types';
import { getEiken1 } from '@/utils/locales/eiken/eiken1';

export type EikentTitle = {
  title: string;
  subTitle: string;
  subcategory: EikenSubcategory;
};

export const geEikentTitles = (eikenCategory: EikenCategory): EikentTitle[] => {
  switch (eikenCategory) {
    case 'eiken1':
      return getEiken1();
    default:
      return getEiken1();
  }
};
