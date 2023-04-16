import * as Localization from 'expo-localization';
import I18n from 'i18n-js';

import en from './locales/en';
import ja from './locales/ja';

I18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
I18n.fallbacks = true;

I18n.translations = {
  en,
  ja,
};

export default I18n;
