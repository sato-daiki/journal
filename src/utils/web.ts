import * as Localization from 'expo-localization';
import { ImageSourcePropType } from 'react-native';
import {
  CommentJa,
  CommentEn,
  SummaryJa,
  SummaryEn,
  EntryJa,
  EntryEn,
  GiarEn,
  GiarJa,
  GiarZh,
  GiarKo,
  CorrectJa,
  CorrectEn,
} from '../images/web';

type name = 'comment' | 'correct' | 'entry' | 'girl' | 'summary';

export const getImage = (name: name): ImageSourcePropType | null => {
  const code = Localization.locale.split('-')[0];
  switch (name) {
    case 'comment':
      if (code === 'en') {
        return CommentJa;
      }
      return CommentEn;
    case 'summary':
      if (code === 'en') {
        return SummaryJa;
      }
      return SummaryEn;
    case 'entry':
      if (code === 'en') {
        return EntryJa;
      }
      return EntryEn;
    case 'girl':
      if (code === 'en') {
        return GiarEn;
      }
      if (code === 'ja') {
        return GiarJa;
      }
      if (code === 'ko') {
        return GiarKo;
      }
      if (code === 'zh') {
        return GiarZh;
      }
      return GiarEn;
    case 'correct':
      if (code === 'en') {
        return CorrectJa;
      }
      return CorrectEn;
    default:
      return null;
  }
};
