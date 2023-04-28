import axios from 'axios';
// @ts-ignore
import { LANGUAGE_TOOL_API_KEY } from '@env';
import { Language, Match } from '../types';
import { softRed, softRedOpacy, yellow, yellowOpacy } from '@/styles/Common';

export const spellChecker = async (
  learnLanguage: Language,
  title: string,
  text: string,
): Promise<any> => {
  try {
    const response = await axios.post(
      'https://api.languagetoolplus.com/v2/check',
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

export const getColors = (match: Match) => {
  if (match.rule?.issueType === 'misspelling') {
    return { color: softRed, backgroundColor: softRedOpacy };
  } else {
    return { color: yellow, backgroundColor: yellowOpacy };
  }
};
