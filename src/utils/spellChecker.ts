import axios from 'axios';
// @ts-ignore
// import { LANGUAGE_TOOL_API_KEY } from '@env';
import { Language } from '../types';
import { captureException } from './sentry';

const spellChecker = async (
  learnLanguage: Language,
  title: string,
  text: string,
): Promise<any> => {
  try {
    const response = await axios.post(
      'https://api.languagetool.org/v2/check',
      {
        language: learnLanguage,
        text: text,
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
    captureException(err);
  }
  return;
};

export default spellChecker;
