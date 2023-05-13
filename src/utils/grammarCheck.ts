import axios from 'axios';
import * as Crypto from 'expo-crypto';
// @ts-ignore
import { LANGUAGE_TOOL_API_KEY, SAPLING_API_KEY } from '@env';
import {
  Edit,
  LanguageInfo,
  LanguageTool,
  LongCode,
  Match,
  Result,
  Sapling,
} from '../types';
import { softRed, softRedOpacy, yellow, yellowOpacy } from '@/styles/Common';

const LANGUAGE_TOOL_ENDPOINT = 'https://api.languagetoolplus.com/v2';

export const getLanguageToolCode = (longCode: LongCode) => {
  if (longCode) {
    return longCode.substring(0, 2);
  }
};

export const getLanguageToolShortName = (longCode: LongCode) => {
  const shortLongCode = getLanguageToolCode(longCode);
  switch (shortLongCode) {
    case 'en':
      return 'English';
    case 'de':
      return 'German';
    case 'es':
      return 'Spanish';
    case 'fr':
      return 'French';
    case 'pt':
      return 'Portuguese';
    case 'nl':
      return 'Dutch';
    default:
      return 'English';
  }
};

export const getLanguageToolNationalityCode = (longCode: LongCode) => {
  if (longCode) {
    // ログアウトの時落ちる
    return longCode
      .substring(longCode.length - 2, longCode.length)
      .toUpperCase();
  }
};

export const getLanguageToolName = (longCode: LongCode) => {
  switch (longCode) {
    case 'en-AU':
      return 'English (Australia)';
    case 'en-GB':
      return 'English (British)';
    case 'en-CA':
      return 'English (Canada)';
    case 'en-NZ':
      return 'English (New Zealand)';
    case 'en-ZA':
      return 'English (South African)';
    case 'en-US':
      return 'English (US)';
    case 'de-AT':
      return 'German (Austria)';
    case 'de-DE':
      return 'German (Germany)';
    case 'de-CH':
      return 'German (Switzerland)';
    case 'es':
      return 'Spanish';
    case 'fr':
      return 'French';
    case 'pt-AO':
      return 'Portuguese (Angola)';
    case 'pt-BR':
      return 'Portuguese (Brazil)';
    case 'pt-MZ':
      return 'Portuguese (Mozambique)';
    case 'pt-PT':
      return 'Portuguese (Portugal)';
    case 'nl':
      return 'Dutch';
    default:
      return 'English (US)';
  }
};

export const languageToolLanguages: LanguageInfo[] = [
  { code: 'en', longCode: 'en-AU', name: 'English (Australia)' },
  { code: 'en', longCode: 'en-GB', name: 'English (British)' },
  { code: 'en', longCode: 'en-CA', name: 'English (Canada)' },
  { code: 'en', longCode: 'en-NZ', name: 'English (New Zealand)' },
  { code: 'en', longCode: 'en-ZA', name: 'English (South African)' },
  { code: 'en', longCode: 'en-US', name: 'English (US)' },
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

const languageToolCheck = async (
  learnLanguage: LongCode,
  text: string,
): Promise<{ matches: Match[] | []; result: Result; error: string | null }> => {
  try {
    const response = await axios.post(
      `${LANGUAGE_TOOL_ENDPOINT}/check`,
      {
        language: learnLanguage,
        text: text,
        // PROの時必要
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
    if (response.status === 200 && response.data.matches) {
      return {
        matches: response.data.matches,
        result: response.data.matches.length === 0 ? 'perfect' : 'corrected',
        error: null,
      };
    }
    console.warn('response', response);
    return {
      matches: [],
      result: 'error',
      error: '想定外のエラー1',
    };
  } catch (err: any) {
    console.warn('catch err', err);
    return {
      matches: [],
      result: 'error',
      error: err.message || "'想定外のエラー2",
    };
  }
};

const getLanguageTool = async (
  learnLanguage: LongCode,
  isTitleSkip: boolean,
  title: string,
  text: string,
): Promise<LanguageTool | undefined> => {
  try {
    let titleMatches: Match[] | [] = [];
    let titleResult: Result;
    let titleError: string | null = null;
    if (isTitleSkip) {
      titleResult = 'skip';
    } else {
      const titleLanguageTool = await languageToolCheck(learnLanguage, title);
      titleMatches = titleLanguageTool.matches;
      titleResult = titleLanguageTool.result;
      titleError = titleLanguageTool.error;
    }

    const textLanguageTool = await languageToolCheck(learnLanguage, text);

    return {
      titleMatches,
      titleResult,
      titleError: titleError || null,
      textMatches: textLanguageTool.matches,
      textResult: textLanguageTool.result,
      textError: textLanguageTool.error || null,
    };
  } catch (err: any) {
    console.warn(err);
    return;
  }
};

export const getLanguageToolColors = (match: Match) => {
  if (match.rule?.issueType === 'misspelling') {
    return { color: softRed, backgroundColor: softRedOpacy };
  } else {
    return { color: yellow, backgroundColor: yellowOpacy };
  }
};

const SPALING_ENDPOINT = 'https://api.sapling.ai/api/v1';

const saplingCheck = async (
  learnLanguage: LongCode,
  text: string,
): Promise<{ edits: Edit[] | []; result: Result; error: string | null }> => {
  try {
    // ランダムの値を作る必要があるため
    const session_id = Crypto.randomUUID();

    const response = await axios.post(
      `${SPALING_ENDPOINT}/edits`,
      {
        lang: getLanguageToolCode(learnLanguage),
        text: text,
        key: SAPLING_API_KEY,
        session_id: session_id,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    if (response.status === 200 && response.data.edits) {
      return {
        edits: response.data.edits,
        result: response.data.edits.length === 0 ? 'perfect' : 'corrected',
        error: null,
      };
    }
    console.warn(response);
    return {
      edits: [],
      result: 'error',
      error: '想定外のエラー3',
    };
  } catch (err: any) {
    console.warn(err);
    return {
      edits: [],
      result: 'error',
      error: err.message || "'想定外のエラー4",
    };
  }
};

const getSapling = async (
  learnLanguage: LongCode,
  isTitleSkip: boolean,
  title: string,
  text: string,
): Promise<Sapling | undefined> => {
  try {
    let titleEdits: Edit[] | [] = [];
    let titleResult: Result;
    let titleError: string | null = null;
    if (isTitleSkip) {
      titleResult = 'skip';
    } else {
      const titleSapling = await saplingCheck(learnLanguage, title);
      titleEdits = titleSapling.edits;
      titleResult = titleSapling.result;
      titleError = titleSapling.error;
    }

    const textSapling = await saplingCheck(learnLanguage, text);
    return {
      titleEdits,
      titleResult,
      titleError,
      textEdits: textSapling.edits,
      textResult: textSapling.result,
      textError: textSapling.error,
    };
  } catch (err: any) {
    console.warn(err);
    return;
  }
};

export const getSaplingColors = (edit: Edit) => {
  if (edit.general_error_type === 'Spelling') {
    return { color: softRed, backgroundColor: softRedOpacy };
  } else {
    return { color: yellow, backgroundColor: yellowOpacy };
  }
};

export const getAiCheck = async (
  learnLanguage: LongCode,
  isTitleSkip: boolean,
  title: string,
  text: string,
) => {
  const languageTool = await getLanguageTool(
    learnLanguage,
    isTitleSkip,
    title,
    text,
  );
  console.log('languageTool', languageTool);
  const sapling = await getSapling(learnLanguage, isTitleSkip, title, text);
  console.log('sapling', sapling);
  return { languageTool, sapling };
};
