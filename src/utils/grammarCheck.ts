import axios from 'axios';
import * as Crypto from 'expo-crypto';
import {
  Edit,
  LanguageInfo,
  LanguageTool,
  LongCode,
  Match,
  ProWritingAid,
  RawEdit,
  RawMatch,
  RawTag,
  Result,
  Sapling,
  Tag,
} from '../types';
import { softRed, softRedOpacy, yellow, yellowOpacy } from '@/styles/Common';
import Toast from 'react-native-root-toast';
import firestore from '@react-native-firebase/firestore';
import I18n from '@/utils/I18n';
import { logAnalytics } from './Analytics';
import { WhichDiaryKey } from '@/components/organisms/MyDiaryHeaderTitle';
import { languageToolUrl, proWritingAidUrl, saplingUrl } from '@/constants/url';

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

const getMatches = (matches: RawMatch[]): Match[] => {
  return matches.map((item) => {
    return {
      message: item.message,
      shortMessage: item.shortMessage || null,
      offset: item.offset,
      length: item.length,
      replacements: item.replacements.filter((_v, i) => i < 5),
      rule: item.rule
        ? {
            description: item.rule.description,
            urls: item.rule.urls || null,
            issueType: item.rule.issueType || null,
          }
        : null,
    };
  });
};

export const languageToolCheck = async (
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
        // apiKey: process.env.LANGUAGE_TOOL_API_KEY,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      },
    );
    if (response.status === 200 && response.data.matches) {
      logAnalytics('language_tool_check_success');
      return {
        matches:
          response.data.matches.length > 0
            ? getMatches(response.data.matches)
            : [],
        result: response.data.matches.length === 0 ? 'perfect' : 'corrected',
        error: null,
      };
    }
    logAnalytics('language_tool_check_error');
    console.warn('response', response);
    return {
      matches: [],
      result: 'error',
      error: '想定外のエラー1',
    };
  } catch (err: any) {
    logAnalytics('language_tool_check_error_catch');
    console.warn('catch err', err);
    return {
      matches: [],
      result: 'error',
      error: err.message || "'想定外のエラー2",
    };
  }
};

export const getLanguageTool = async (
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

    if (textLanguageTool.result === 'error') {
      logAnalytics('get_language_tool_error');
      Toast.show(I18n.t('postDiary.correctError'), {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
      });
    } else {
      logAnalytics('get_language_tool_success');
    }

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
    logAnalytics('get_language_tool_error_catch');
    Toast.show(I18n.t('postDiary.correctError'), {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
    });

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

const getEdites = (edits: RawEdit[]): Edit[] => {
  return edits.map((item) => {
    return {
      sentence: item.sentence,
      sentence_start: item.sentence_start,
      start: item.start,
      end: item.end,
      replacement: item.replacement,
      general_error_type: item.general_error_type,
    };
  });
};

export const saplingCheck = async (
  learnLanguage: LongCode,
  text: string,
  isTest?: boolean,
): Promise<{ edits: Edit[] | []; result: Result; error: string | null }> => {
  try {
    // ランダムの値を作る必要があるため
    let session_id;
    if (isTest) {
      // jestの時 Cryptoを呼ぶと落ちてしまうので
      session_id = Math.floor(Math.random() * 10000).toString();
    } else {
      session_id = Crypto.randomUUID();
    }

    const response = await axios.post(
      `${SPALING_ENDPOINT}/edits`,
      {
        lang: getLanguageToolCode(learnLanguage),
        text: text,
        key: process.env.SAPLING_API_KEY!,
        session_id: session_id,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    if (response.status === 200 && response.data.edits) {
      logAnalytics('sapling_check_success');
      return {
        edits:
          response.data.edits.length > 0 ? getEdites(response.data.edits) : [],
        result: response.data.edits.length === 0 ? 'perfect' : 'corrected',
        error: null,
      };
    }
    console.warn(response);
    logAnalytics('sapling_check_error');
    return {
      edits: [],
      result: 'error',
      error: '想定外のエラー3',
    };
  } catch (err: any) {
    console.warn(err);
    logAnalytics('sapling_check_error_catch');
    return {
      edits: [],
      result: 'error',
      error: err.message || "'想定外のエラー4",
    };
  }
};

export const getSapling = async (
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

    if (textSapling.result === 'error') {
      Toast.show(I18n.t('postDiary.correctError'), {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
      });
      logAnalytics('get_sapling_error');
    } else {
      logAnalytics('get_sapling_success');
    }

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
    Toast.show(I18n.t('postDiary.correctError'), {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
    });
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

/////////

const PRO_WRITING_AID_ENDPOINT =
  'https://cloud.prowritingaid.com/analysis/api/async';

const getTags = (tags: RawTag[]): Tag[] => {
  return tags.map((item) => {
    return {
      startPos: item.startPos,
      endPos: item.endPos,
      hint: item.hint,
      category: item.category,
      categoryDisplayName: item.categoryDisplayName,
      suggestions: item.suggestions,
      urls: item.urls,
    };
  });
};

export const proWritingAidCheck = async (
  learnLanguage: LongCode,
  text: string,
): Promise<{ tags: Tag[] | []; result: Result; error: string | null }> => {
  try {
    const response = await axios.post(
      `${PRO_WRITING_AID_ENDPOINT}/text`,
      {
        text: text,
        includeParagraphStats: false,
        reports: ['grammar'],
        style: 'General',
        documentType: 0,
        language: 'en',
      },
      {
        headers: {
          Accept: 'application/json',
          licenseCode: process.env.PRO_WRITING_LICENSE_CODE!,
        },
      },
    );
    console.log(response);
    if (response.status === 200 && response.data?.Result?.Tags) {
      logAnalytics('pro_writing_aid_check_success');
      return {
        tags:
          response.data.Result.Tags.length > 0
            ? getTags(response.data.Result.Tags)
            : [],
        result:
          response.data.Result.Tags.length === 0 ? 'perfect' : 'corrected',
        error: null,
      };
    }
    console.warn(response);
    logAnalytics('pro_writing_aid_check_error');
    return {
      tags: [],
      result: 'error',
      error: '想定外のエラー3',
    };
  } catch (err: any) {
    console.warn(err);
    logAnalytics('pro_writing_aid_check_error_catch');
    return {
      tags: [],
      result: 'error',
      error: err.message || "'想定外のエラー4",
    };
  }
};

export const getProWritingAid = async (
  learnLanguage: LongCode,
  isTitleSkip: boolean,
  title: string,
  text: string,
): Promise<ProWritingAid | undefined> => {
  try {
    let titleTags: Tag[] | [] = [];
    let titleResult: Result;
    let titleError: string | null = null;
    if (isTitleSkip) {
      titleResult = 'skip';
    } else {
      const titleProWritingAid = await proWritingAidCheck(learnLanguage, title);
      titleTags = titleProWritingAid.tags;
      titleResult = titleProWritingAid.result;
      titleError = titleProWritingAid.error;
    }

    const textProWritingAid = await proWritingAidCheck(learnLanguage, text);

    if (textProWritingAid.result === 'error') {
      Toast.show(I18n.t('postDiary.correctError'), {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
      });
      logAnalytics('get_pro_writing_aid_error');
    } else {
      logAnalytics('get_pro_writing_aid_success');
    }

    return {
      titleTags,
      titleResult,
      titleError,
      textTags: textProWritingAid.tags,
      textResult: textProWritingAid.result,
      textError: textProWritingAid.error,
    };
  } catch (err: any) {
    console.warn(err);
    Toast.show(I18n.t('postDiary.correctError'), {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
    });
    return;
  }
};

export const getProWritingAidColors = (tag: Tag) => {
  if (tag.category === 'grammarspelling') {
    return { color: softRed, backgroundColor: softRedOpacy };
  } else {
    return { color: yellow, backgroundColor: yellowOpacy };
  }
};
/////////

export const getHumanColors = () => {
  return { color: yellow, backgroundColor: yellowOpacy };
};

export type AiName = 'LanguageTool' | 'Sapling' | 'ProWritingAid' | 'Human';

export const addAiCheckError = async (
  aiName: AiName,
  whichDiary: WhichDiaryKey,
  caller:
    | 'usePostDiary'
    | 'usePostDraftDiary'
    | 'usePostReviseDiary'
    | 'MyDiary'
    | 'NoHuman',
  uid: string,
  diaryId: string,
) => {
  await firestore().collection(`aiCheckError`).add({
    aiName,
    whichDiary,
    caller,
    uid,
    diaryId,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
};

export const getWhatUrl = (aiName: AiName) => {
  switch (aiName) {
    case 'LanguageTool':
      return languageToolUrl;
    case 'Sapling':
      return saplingUrl;
    case 'ProWritingAid':
      return proWritingAidUrl;
  }
};
