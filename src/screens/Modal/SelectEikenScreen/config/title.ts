import { EikenCategory, EikenSubcategory } from '@/types';
import {
  getEiken1,
  getEikenPre1,
  getEiken2,
  getEikenPre2,
} from '@/utils/locales/eiken';

export type EikentTitle = {
  title: string;
  subTitle: string;
  subcategory: EikenSubcategory;
};

export const geEikentTitles = (eikenCategory: EikenCategory): EikentTitle[] => {
  switch (eikenCategory) {
    case 'eiken1':
      return getEiken1();
    case 'eikenPre1':
      return getEikenPre1();
    case 'eiken2':
      return getEiken2();
    case 'eikenPre2':
      return getEikenPre2();
    default:
      return getEiken1();
  }
};
