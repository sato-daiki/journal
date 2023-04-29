import axios from 'axios';
// @ts-ignore
import { LANGUAGE_TOOL_API_KEY } from '@env';
import { Language, LanguageInfo, Match } from '../types';
import { softRed, softRedOpacy, yellow, yellowOpacy } from '@/styles/Common';

const ENDPOINT = 'https://api.languagetoolplus.com/v2';

export const defaultLanguage: LanguageInfo = {
  code: 'en',
  longCode: 'en-US',
  name: 'English (US)',
};
export const languages: LanguageInfo[] = [
  { code: 'en', longCode: 'en-AU', name: 'English (Australia)' },
  { code: 'en', longCode: 'en-GB', name: 'English (British)' },
  { code: 'en', longCode: 'en-CA', name: 'English (Canada)' },
  { code: 'en', longCode: 'en-NZ', name: 'English (New Zealand)' },
  { code: 'en', longCode: 'en-ZA', name: 'English (South African)' },
  defaultLanguage,

  { code: 'de', longCode: 'de-AT', name: 'German (Austria)' },
  { code: 'de', longCode: 'de-DE', name: 'German (Germany)' },
  { code: 'de', longCode: 'de-CH', name: 'German (Switzerland)' },

  { code: 'es', longCode: 'es', name: 'Spanish' },
  { code: 'fr', longCode: 'fr', name: 'French' },

  { code: 'pt', longCode: 'pt-AO', name: 'Portuguese (Angola)' },
  { code: 'pt', longCode: 'pt-BR', name: 'Portuguese (Brazil)' },
  { code: 'pt', longCode: 'pt-MZ', name: 'Portuguese (Mozambique)' },
  { code: 'pt', longCode: 'pt-PT', name: 'Portuguese (Portugal)' },

  { code: 'nl', longCode: 'nl', name: 'Dutch' },
];

export const spellChecker = async (
  learnLanguage: Language,
  title: string,
  text: string,
): Promise<any> => {
  try {
    const response = await axios.post(
      `${ENDPOINT}/check`,
      {
        language: learnLanguage,
        text: text,
        // username: 'daiki12345daiki12345@gmail.com',
        // apiKey: LANGUAGE_TOOL_API_KEY,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      },
    );
    return response.data;
  } catch (err: any) {
    console.warn(err);
  }
  return;
};

export const getLanguages = async (): Promise<any> => {
  try {
    const response = await axios.get(`${ENDPOINT}/languages`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (err: any) {
    console.warn(err);
  }
  return;
};

export const getColors = (match: Match) => {
  if (match.rule?.issueType === 'misspelling') {
    return { color: softRed, backgroundColor: softRedOpacy };
  } else {
    return { color: yellow, backgroundColor: yellowOpacy };
  }
};
