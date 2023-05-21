export interface HumanCorrect {
  original: string;
  correction?: string;
}

export interface Human {
  titleCorrects: HumanCorrect[] | [];
  textCorrects: HumanCorrect[] | [];
}

export const humanSample: Human = {
  titleCorrects: [
    {
      original:
        'LangJournal is a language learning application specializing in writing.',
      correction:
        'Supported languages: English, German, Spanish, French, Portuguese, Dutch (more languages will be added)',
    },
  ],
  textCorrects: [
    {
      original:
        'Supported languages: English, German, Spanish, French, Portuguese, Dutch (to be expanded)',
      correction:
        'Supported languages: English, German, Spanish, French, Portuguese, Dutch (more languages will be added)',
    },
    {
      original: 'www',
    },
    {
      original:
        '【The benefits of writing a journal in a foreign language】Writing is extremely important in language learning. You cannot speak what you cannot write. Writing is also good speaking practice.',
      correction:
        '【Benefits of writing a journal in a foreign language】Writing is extremely important in language learning. You cannot speak what you cannot write. Writing will also become good speaking practice.',
    },
  ],
};
